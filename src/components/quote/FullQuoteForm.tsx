"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import { MdLockOutline } from "react-icons/md";
import { Select } from "@/src/components/common/Select";
import { useRouter } from "next/navigation";
import { SuccessPopup } from "./SuccessPopup";
import {
  getQuoteEnums,
  submitQuote,
  QuoteEnums,
} from "@/src/services/quotesApi";
import toast from "react-hot-toast";
import { LoadingScreen } from "../common/LoadingScreen";

const REQUIRED_FIELDS = [
  "company_name",
  "name",
  "email",
  "phone",
  "industry_id",
  "project_type",
  "printing_type",
] as const;

type RequiredField = (typeof REQUIRED_FIELDS)[number];

// ✅ أسماء الحقول المترجمة
const FIELD_LABELS: Record<string, { ar: string; en: string }> = {
  company_name: { ar: "اسم الشركة", en: "Company Name" },
  name: { ar: "اسم الشخص", en: "Contact Name" },
  email: { ar: "البريد الإلكتروني", en: "Email" },
  phone: { ar: "رقم الهاتف", en: "Phone" },
  industry_id: { ar: "القطاع", en: "Industry" },
  project_type: { ar: "نوع المشروع", en: "Project Type" },
  printing_type: { ar: "نوع الطباعة", en: "Printing Type" },
};

// ✅ رسائل الأخطاء (مفاتيح + ترجمات)
const ERROR_MESSAGES: Record<string, { ar: string; en: string }> = {
  // ✅ required errors
  company_name_required: {
    ar: "اسم الشركة مطلوب",
    en: "Company name is required",
  },
  name_required: {
    ar: "اسم الشخص مطلوب",
    en: "Contact name is required",
  },
  email_required: {
    ar: "البريد الإلكتروني مطلوب",
    en: "Email is required",
  },
  email_invalid: {
    ar: "البريد الإلكتروني غير صحيح",
    en: "Email is invalid",
  },
  phone_required: {
    ar: "رقم الهاتف مطلوب",
    en: "Phone number is required",
  },
  phone_invalid: {
    ar: "رقم الهاتف غير صحيح",
    en: "Phone number is invalid",
  },
  industry_id_required: {
    ar: "يرجى اختيار القطاع",
    en: "Please select an industry",
  },
  project_type_required: {
    ar: "يرجى اختيار نوع المشروع",
    en: "Please select a project type",
  },
  printing_type_required: {
    ar: "يرجى اختيار نوع الطباعة",
    en: "Please select a printing type",
  },
};

// ✅ مكوّن رسالة الخطأ - يستقبل errorKey وليس النص
interface ErrorMessageProps {
  errorKey?: string;
  language: string;
}

const ErrorMessage = ({ errorKey, language }: ErrorMessageProps) => {
  if (!errorKey) return null;

  const message = ERROR_MESSAGES[errorKey]?.[
    language === "ar" ? "ar" : "en"
  ];
  if (!message) return null;

  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
      <span className="w-1 h-1 rounded-full bg-red-500"></span>
      {message}
    </p>
  );
};

export const FullQuoteForm = () => {
  const { t, dir, language } = useLanguage();
   const router = useRouter();
  const [enums, setEnums] = useState<QuoteEnums | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // ✅ الآن نخزن مفاتيح الأخطاء وليس النصوص
  const [errorKeys, setErrorKeys] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    industry_id: "",
    company_name: "",
    name: "",
    email: "",
    phone: "",
    project_type: "",
    project_description: "",
    expected_delivery_date: "",
    priority_level: "",
    printing_type: "",
    other_paper_type: "",
    fabric_paper_weight: "",
    printing_method: "",
    large_format_colors: "",
    finishing_type: "",
    brand_identity_need: "",
    packaging_type: "",
    display_box_material: "",
    rigid_board_finish: "",
    emboss_prototype_required: "",
    artwork_available: "",
    budget_range: "",
  });

  const isArabic = language === "ar";

  useEffect(() => {
    const fetchEnums = async () => {
      try {
        setLoading(true);
        const response = await getQuoteEnums(language);
        setEnums(response.data);
      } catch (error) {
        console.error("Failed to fetch quote enums:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnums();
  }, [language]);

  const isRequired = (name: string): boolean => {
    return REQUIRED_FIELDS.includes(name as RequiredField);
  };

  const getFieldLabel = (name: string): string => {
    return FIELD_LABELS[name]?.[isArabic ? "ar" : "en"] || name;
  };

  // ✅ الحصول على رسالة الخطأ المترجمة من المفتاح
  const getErrorMessage = (key: string): string => {
    return ERROR_MESSAGES[key]?.[isArabic ? "ar" : "en"] || "";
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    return /^[+]?[\d\s\-()]{8,20}$/.test(phone);
  };

  // ✅ التحقق يُعيد مفتاح الخطأ وليس النص
  const validateField = (name: string, value: string): string => {
    if (isRequired(name) && !value.trim()) {
      return `${name}_required`;
    }

    if (name === "email" && value.trim() && !isValidEmail(value)) {
      return "email_invalid";
    }

    if (name === "phone" && value.trim() && !isValidPhone(value)) {
      return "phone_invalid";
    }

    return "";
  };

  const validateAll = (): { isValid: boolean; errorFields: string[] } => {
    const newErrorKeys: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      const errorKey = validateField(key, String(value));
      if (errorKey) newErrorKeys[key] = errorKey;
    });

    setErrorKeys(newErrorKeys);
    setTouched(
      Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    return {
      isValid: Object.keys(newErrorKeys).length === 0,
      errorFields: Object.keys(newErrorKeys),
    };
  };

  const handleChange = (name: string, value: string | number) => {
    setFormData({ ...formData, [name]: value });

    if (errorKeys[name]) {
      setErrorKeys((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (touched[name]) {
      const errorKey = validateField(name, String(value));
      if (errorKey) {
        setErrorKeys((prev) => ({ ...prev, [name]: errorKey }));
      } else {
        setErrorKeys((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    const value = String(formData[name as keyof typeof formData] || "");
    const errorKey = validateField(name, value);

    if (errorKey) {
      setErrorKeys((prev) => ({ ...prev, [name]: errorKey }));

      // ✅ Toast يعرض الرسالة المترجمة الحالية
      const fieldLabel = getFieldLabel(name);
      const errorMessage = getErrorMessage(errorKey);

      toast.error(`${fieldLabel}: ${errorMessage}`, {
        id: `blur-${name}`,
        duration: 3000,
      });
    } else {
      setErrorKeys((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArtworkFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errorFields } = validateAll();

    if (!isValid) {
      const fieldNames = errorFields.map(getFieldLabel).join("، ");

      toast.error(
        isArabic
          ? `يرجى تصحيح الحقول التالية: ${fieldNames}`
          : `Please fix these fields: ${fieldNames}`,
        { duration: 5000, id: "submit-errors" }
      );

      const firstErrorField = errorFields[0];
      if (firstErrorField) {
        setTimeout(() => {
          const element = document.querySelector(
            `[name="${firstErrorField}"]`
          ) as HTMLElement;
          element?.scrollIntoView({ behavior: "smooth", block: "center" });
          element?.focus();
        }, 100);
      }
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, String(value));
      });

      if (artworkFile) {
        data.append("artwork_file", artworkFile);
      }

      const response = await submitQuote(data, language);

      if (response.result) {
          setShowSuccessPopup(true);
        setFormData({
          industry_id: "",
          company_name: "",
          name: "",
          email: "",
          phone: "",
          project_type: "",
          project_description: "",
          expected_delivery_date: "",
          priority_level: "",
          printing_type: "",
          other_paper_type: "",
          fabric_paper_weight: "",
          printing_method: "",
          large_format_colors: "",
          finishing_type: "",
          brand_identity_need: "",
          packaging_type: "",
          display_box_material: "",
          rigid_board_finish: "",
          emboss_prototype_required: "",
          artwork_available: "",
          budget_range: "",
        });
        setArtworkFile(null);
        setErrorKeys({});
        setTouched({});
      }
    } catch (error: any) {
      console.error("Failed to submit quote:", error);
      toast.error(
        error.message || "Failed to submit quote. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const labelClass = "block text-sm font-medium text-[#171A21] mb-2";

  const baseInputClass =
    "w-full px-4 py-3 rounded-xl border bg-[#F9FAFB] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all";

  const getInputClass = (name: string) => {
    const hasError = !!errorKeys[name];

    if (hasError) {
      return `${baseInputClass} border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10`;
    }

    return `${baseInputClass} border-[#E1E3E4] focus:border-primary focus:ring-primary/10`;
  };

  if (loading || !enums) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
if (loading) {
  return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
}
  return (
   <>
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8 lg:space-y-12"
      dir={dir}
    >
      {/* ===== Client Information ===== */}
      <div>
        <h3 className="text-xl font-bold text-primary mb-5 border-b border-[#E1E3E4] pb-2">
          {t.quote?.clientInfo || "Client Information"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Company Name */}
          <div>
            <label className={labelClass}>
              {t.quote?.companyName || "Company Name"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={(e) => handleChange("company_name", e.target.value)}
              onBlur={() => handleBlur("company_name")}
              placeholder="e.g. Abc Company"
              className={getInputClass("company_name")}
            />
            <ErrorMessage
              errorKey={errorKeys.company_name}
              language={language}
            />
          </div>

          {/* Contact Name */}
          <div>
            <label className={labelClass}>
              {t.quote?.contactName || "Contact Name"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="e.g. Ahmed Ali"
              className={getInputClass("name")}
            />
            <ErrorMessage errorKey={errorKeys.name} language={language} />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>
              {t.quote?.emailAddress || "Email Address"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="company@example.com"
              className={getInputClass("email")}
            />
            <ErrorMessage errorKey={errorKeys.email} language={language} />
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>
              {t.quote?.phoneNumber || "Phone Number"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              placeholder="+20 106 796 5930"
              className={getInputClass("phone")}
              dir="ltr"
            />
            <ErrorMessage errorKey={errorKeys.phone} language={language} />
          </div>

          {/* Industry */}
          <div>
            <label className={labelClass}>
              {t.quote?.industry || "Industry"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Select
              options={enums.industries}
              value={formData.industry_id}
              onChange={(val) => handleChange("industry_id", val)}
              onBlur={() => handleBlur("industry_id")}
              placeholder={t.quote?.selectIndustry || "Select Industry..."}
              name="industry_id"
              error={!!errorKeys.industry_id}
            />
            <ErrorMessage
              errorKey={errorKeys.industry_id}
              language={language}
            />
          </div>
        </div>
      </div>

      {/* ===== Project Information ===== */}
      <div>
        <h3 className="text-xl font-bold text-primary mb-5 border-b border-[#E1E3E4] pb-2">
          {t.quote?.projectInfo || "Project Information"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Project Type */}
          <div className="md:col-span-2 mb-2">
            <label className={labelClass}>
              {t.quote?.projectType || "Project Type"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Select
              options={enums.project_types}
              value={formData.project_type}
              onChange={(val) => handleChange("project_type", val)}
              onBlur={() => handleBlur("project_type")}
              placeholder={
                t.quote?.selectProjectType || "Select Project Type..."
              }
              name="project_type"
              error={!!errorKeys.project_type}
            />
            <ErrorMessage
              errorKey={errorKeys.project_type}
              language={language}
            />
          </div>

          {/* Project Description */}
          <div className="md:col-span-2">
            <label className={labelClass}>
              {t.quote?.projectDescription || "Project Description"}
            </label>
            <textarea
              name="project_description"
              value={formData.project_description}
              onChange={(e) =>
                handleChange("project_description", e.target.value)
              }
              rows={4}
              placeholder={
                t.quote?.projectDescriptionPlaceholder ||
                "Provide a brief overview of your project needs..."
              }
              className={`${baseInputClass} border-[#E1E3E4] focus:border-primary focus:ring-primary/10 resize-none`}
            />
          </div>

          {/* Delivery Date */}
          <div>
            <label className={labelClass}>
              {t.quote?.deliveryDate || "Expected Delivery Date"}
            </label>
            <input
              type="date"
              name="expected_delivery_date"
              value={formData.expected_delivery_date}
              onChange={(e) =>
                handleChange("expected_delivery_date", e.target.value)
              }
              className={`${baseInputClass} border-[#E1E3E4] focus:border-primary focus:ring-primary/10`}
            />
          </div>

          {/* Priority Level */}
          <div>
            <label className={labelClass}>
              {t.quote?.priorityLevel || "Priority Level"}
            </label>
            <Select
              options={enums.priority_levels}
              value={formData.priority_level}
              onChange={(val) => handleChange("priority_level", val)}
              placeholder={t.quote?.selectPriority || "Select Priority..."}
              name="priority_level"
            />
          </div>
        </div>
      </div>

      {/* ===== Printing Details ===== */}
      <div>
        <h3 className="text-xl font-bold text-primary mb-5 border-b border-[#E1E3E4] pb-2">
          {t.quote?.printingDetails || "Printing Details"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Printing Type */}
          <div className="md:col-span-2">
            <label className={labelClass}>
              {t.quote?.printingType || "Printing Type"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Select
              options={enums.printing_types}
              value={formData.printing_type}
              onChange={(val) => handleChange("printing_type", val)}
              onBlur={() => handleBlur("printing_type")}
              placeholder={
                t.quote?.selectPrintingType || "Select Printing Type..."
              }
              name="printing_type"
              error={!!errorKeys.printing_type}
            />
            <ErrorMessage
              errorKey={errorKeys.printing_type}
              language={language}
            />
          </div>

          {/* Other Paper Type */}
          <div>
            <label className={labelClass}>
              {t.quote?.otherPaperType || "Other Paper Type"}
            </label>
            <Select
              options={enums.paper_types}
              value={formData.other_paper_type}
              onChange={(val) => handleChange("other_paper_type", val)}
              placeholder={t.quote?.selectPaperType || "Select Paper Type..."}
              name="other_paper_type"
            />
          </div>

          {/* Fabric Paper Weight */}
          <div>
            <label className={labelClass}>
              {t.quote?.fabricPaperWeight || "Fabric Paper Weight"}
            </label>
            <Select
              options={enums.paper_weights}
              value={formData.fabric_paper_weight}
              onChange={(val) => handleChange("fabric_paper_weight", val)}
              placeholder={
                t.quote?.selectPaperWeight || "Select Paper Weight..."
              }
              name="fabric_paper_weight"
            />
          </div>

          {/* Printing Method */}
          <div>
            <label className={labelClass}>
              {t.quote?.printingMethod || "Printing Method"}
            </label>
            <Select
              options={enums.printing_methods}
              value={formData.printing_method}
              onChange={(val) => handleChange("printing_method", val)}
              placeholder={t.quote?.selectMethod || "Select Method..."}
              name="printing_method"
            />
          </div>

          {/* Large Format Colors */}
          <div>
            <label className={labelClass}>
              {t.quote?.largeFormatColors || "Large Format Colors"}
            </label>
            <Select
              options={enums.color_types}
              value={formData.large_format_colors}
              onChange={(val) => handleChange("large_format_colors", val)}
              placeholder={t.quote?.selectColor || "Select Color..."}
              name="large_format_colors"
            />
          </div>

          {/* Full Color Finishing */}
          <div>
            <label className={labelClass}>
              {t.quote?.fullColorFinishing || "Full Color Finishing"}
            </label>
            <Select
              options={enums.finishing_types}
              value={formData.finishing_type}
              onChange={(val) => handleChange("finishing_type", val)}
              placeholder={t.quote?.select || "Select..."}
              name="finishing_type"
            />
          </div>

          {/* Brand Identity Need */}
          <div>
            <label className={labelClass}>
              {t.quote?.brandIdentityNeed || "Brand Identity Need"}
            </label>
            <Select
              options={enums.brand_identity_needs}
              value={formData.brand_identity_need}
              onChange={(val) => handleChange("brand_identity_need", val)}
              placeholder={
                t.quote?.selectBrandIdentity || "Select Brand Identity..."
              }
              name="brand_identity_need"
            />
          </div>

          {/* Packaging Type */}
          <div>
            <label className={labelClass}>
              {t.quote?.packagingType || "Packaging Type"}
            </label>
            <Select
              options={enums.packaging_types}
              value={formData.packaging_type}
              onChange={(val) => handleChange("packaging_type", val)}
              placeholder={t.quote?.selectPackaging || "Select Packaging..."}
              name="packaging_type"
            />
          </div>

          {/* Display Box Material */}
          <div>
            <label className={labelClass}>
              {t.quote?.displayBoxMaterial || "Display Box Material"}
            </label>
            <Select
              options={enums.display_box_materials}
              value={formData.display_box_material}
              onChange={(val) => handleChange("display_box_material", val)}
              placeholder={t.quote?.selectMaterial || "Select Material..."}
              name="display_box_material"
            />
          </div>

          {/* Rigid Board Finish */}
          <div>
            <label className={labelClass}>
              {t.quote?.rigidBoardFinish || "Rigid Board Finish"}
            </label>
            <Select
              options={enums.rigid_board_finishes}
              value={formData.rigid_board_finish}
              onChange={(val) => handleChange("rigid_board_finish", val)}
              placeholder={t.quote?.select || "Select..."}
              name="rigid_board_finish"
            />
          </div>

          {/* Emboss Prototype */}
          <div>
            <label className={labelClass}>
              {t.quote?.embossPrototype || "Emboss Prototype Required"}
            </label>
            <Select
              options={[
                { value: "yes", label: t.quote?.yes || "Yes" },
                { value: "no", label: t.quote?.no || "No" },
              ]}
              value={formData.emboss_prototype_required}
              onChange={(val) =>
                handleChange("emboss_prototype_required", val)
              }
              placeholder={t.quote?.select || "Select..."}
              name="emboss_prototype_required"
            />
          </div>

          {/* Artwork Available */}
          <div>
            <label className={labelClass}>
              {t.quote?.artworkAvailable || "Artwork Available"}
            </label>
            <Select
              options={enums.artwork_types}
              value={formData.artwork_available}
              onChange={(val) => handleChange("artwork_available", val)}
              placeholder={t.quote?.select || "Select..."}
              name="artwork_available"
            />
          </div>

          {/* Budget */}
          <div>
            <label className={labelClass}>
              {t.quote?.budget || "Budget"}
            </label>
            <Select
              options={enums.budget_ranges}
              value={formData.budget_range}
              onChange={(val) => handleChange("budget_range", val)}
              placeholder={t.quote?.select || "Select..."}
              name="budget_range"
            />
          </div>

          {/* Artwork File */}
          <div className="md:col-span-2">
            <label className={labelClass}>
              {t.quote?.artworkFile || "Artwork File"}
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.psd,.eps,.svg,.jpg,.png,.ai"
              className="w-full px-4 py-3 rounded-xl border border-[#E1E3E4] bg-[#F9FAFB] text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium file:cursor-pointer hover:file:bg-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          disabled={submitting}
          className="w-full min-w-40.25 lg:w-44 cursor-pointer bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          {submitting
            ? t.quote?.sending || "Sending..."
            : t.quote?.submit || "Get a Quote"}
        </button>
      </div>

      <div className="flex  justify-center gap-1 text-[#45464F] text-xs font-medium">
        <MdLockOutline className="text-xl lg:text-base" />
        <p className="text-xs">
          {t.quote?.secureNote ||
            "Your information is secure and will only be used to process your quote."}
        </p>
      </div>
    </form>
        <SuccessPopup
      isOpen={showSuccessPopup}
      onClose={() => setShowSuccessPopup(false)}
      language={language}
    />
   </>
  );
};