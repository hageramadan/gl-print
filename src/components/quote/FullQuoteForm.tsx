"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import { MdLockOutline } from "react-icons/md";
import { Select } from "@/src/components/common/Select";
import {
  getQuoteEnums,
  submitQuote,
  QuoteEnums,
} from "@/src/services/quotesApi";
import toast from "react-hot-toast";

export const FullQuoteForm = () => {
  const { t, dir, language } = useLanguage();
  const [enums, setEnums] = useState<QuoteEnums | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

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

  const handleChange = (name: string, value: string | number) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArtworkFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.industry_id ||
      !formData.company_name ||
      !formData.name ||
      !formData.email
    ) {
      toast.error("Please fill required fields");
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
        toast.success(
          response.message || "Quote request submitted successfully!",
        );
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
      }
    } catch (error: any) {
      console.error("Failed to submit quote:", error);
      toast.error(error.message || "Failed to submit quote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const labelClass = "block text-sm font-medium text-[#171A21] mb-2";
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#E1E3E4] bg-[#F9FAFB] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

  if (loading || !enums) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12" dir={dir}>
      {/* ===== Client Information ===== */}
      <div>
        <h3 className="text-xl font-bold text-primary mb-5 border-b border-[#E1E3E4] pb-2">
          {t.quote?.clientInfo || "Client Information"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>
              {t.quote?.companyName || "Company Name"}{" "}
              <span className="text-secondary">*</span>
            </label>
            <input
              type="text"
              value={formData.company_name}
              onChange={(e) => handleChange("company_name", e.target.value)}
              placeholder="e.g. Abc Company"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              {t.quote?.contactName || "Contact Name"}{" "}
              <span className="text-secondary">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Ahmed Ali"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              {t.quote?.emailAddress || "Email Address"}{" "}
              <span className="text-secondary">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="company@example.com"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              {t.quote?.phoneNumber || "Phone Number"}{" "}
              <span className="text-secondary">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+20 106 796 5930"
              required
              className={inputClass}
              dir="ltr"
            />
          </div>
          <div>
            <label className={labelClass}>
              {t.quote?.industry || "Industry"}
            </label>
            <Select
              options={enums.industries}
              value={formData.industry_id}
              onChange={(val) => handleChange("industry_id", val)}
              placeholder={t.quote?.selectIndustry || "Select Industry..."}
              name="industry_id"
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
          <div className="md:col-span-2 mb-2">
            <label className={labelClass}>
              {t.quote?.projectType || "Project Type"}{" "}
              <span className="text-secondary">*</span>
            </label>
            <Select
              options={enums.project_types}
              value={formData.project_type}
              onChange={(val) => handleChange("project_type", val)}
              placeholder={
                t.quote?.selectProjectType || "Select Project Type..."
              }
              required
              name="project_type"
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              {t.quote?.projectDescription || "Project Description"}
            </label>
            <textarea
              value={formData.project_description}
              onChange={(e) =>
                handleChange("project_description", e.target.value)
              }
              rows={4}
              placeholder={
                t.quote?.projectDescriptionPlaceholder ||
                "Provide a brief overview of your project needs..."
              }
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className={labelClass}>
              {t.quote?.deliveryDate || "Expected Delivery Date"}
            </label>
            <input
              type="date"
              value={formData.expected_delivery_date}
              onChange={(e) =>
                handleChange("expected_delivery_date", e.target.value)
              }
              className={inputClass}
            />
          </div>
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
          <div className="md:col-span-2">
            <label className={labelClass}>
              {t.quote?.printingType || "Printing Type"}{" "}
              <span className="text-secondary">*</span>
            </label>
            <Select
              options={enums.printing_types}
              value={formData.printing_type}
              onChange={(val) => handleChange("printing_type", val)}
              placeholder={
                t.quote?.selectPrintingType || "Select Printing Type..."
              }
              required
              name="printing_type"
            />
          </div>
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
              onChange={(val) => handleChange("emboss_prototype_required", val)}
              placeholder={t.quote?.select || "Select..."}
              name="emboss_prototype_required"
            />
          </div>
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
          <div>
            <label className={labelClass}>{t.quote?.budget || "Budget"}</label>
            <Select
              options={enums.budget_ranges}
              value={formData.budget_range}
              onChange={(val) => handleChange("budget_range", val)}
              placeholder={t.quote?.select || "Select..."}
              name="budget_range"
            />
          </div>
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

      <div className="flex items-center justify-center gap-1 text-[#45464F] text-xs font-medium">
        <MdLockOutline />
        <p className="text-xs">
          {t.quote?.secureNote ||
            "Your information is secure and will only be used to process your quote."}
        </p>
      </div>
    </form>
  );
};
