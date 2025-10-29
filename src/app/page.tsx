"use client";

import { useState } from "react";
import { Eye, Lock, EyeOff, Upload, X, CheckCircle } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    incidentType: "",
    description: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [showAnonymityInfo, setShowAnonymityInfo] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCommunityGuidelines, setShowCommunityGuidelines] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.incidentType)
      newErrors.incidentType = "Please select an incident type";
    if (!formData.description || formData.description.length < 10) {
      newErrors.description =
        "Please provide a detailed description (minimum 10 characters)";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('incidentType', formData.incidentType);
      formDataToSend.append('description', formData.description);
      
      // Append all files with the field name 'attachments'
      files.forEach((file) => {
        formDataToSend.append('attachments', file);
      });

      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/standrews/report', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type - browser will set it automatically with boundary for multipart/form-data
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit report');
      }

      const result = await response.json();
      console.log('Report submitted successfully:', result);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      setErrors({ submit: 'Failed to submit report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validTypes = new Set([
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]);

      const validFiles = newFiles.filter((file) => {
        if (!validTypes.has(file.type)) return false;
        if (file.size > 10 * 1024 * 1024) return false; // 10MB limit
        return true;
      });

      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-900 rounded-xl shadow-2xl p-8 text-center border border-gray-800">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">
            Report Submitted Safely
          </h1>
          <p className="text-gray-300 mb-4">
            Your anonymous report has been securely submitted. You are completely
            protected - no one can trace this report back to you or retaliate
            against you.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            No personal information, IP addresses, or identifying data was
            collected or stored.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                incidentType: "",
                description: "",
              });
              setFiles([]);
              setErrors({});
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:ring-4 focus:ring-blue-500/50"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 shadow-xl">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white">St. Andrews Watch</h1>
          </div>
          <p className="text-gray-400">
            Anonymous Crime Reporting Platform
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Anonymity Banner */}
        <div className="bg-gray-900 border border-blue-500/30 rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-start gap-4">
            <Lock className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="font-semibold text-blue-400 mb-2 text-lg">
                Anonymity: No social pressure, no retaliation and no intimidation
              </h2>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                Report incidents without fear of intimidation or targeting. This
                platform ensures complete anonymity - no one can trace reports
                back to you, protecting you from retaliation by offenders or
                social pressure.
              </p>
              <button
                onClick={() => setShowAnonymityInfo(!showAnonymityInfo)}
                className="flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors"
              >
                {showAnonymityInfo ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showAnonymityInfo
                  ? "Hide details"
                  : "Learn more about our privacy protection"}
              </button>
              {showAnonymityInfo && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700 text-sm">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-blue-400 mb-2">
                        Technical Protection:
                      </p>
                      <ul className="space-y-1 text-gray-300">
                        <li>• No IP address logging or tracking</li>
                        <li>• No cookies or session storage</li>
                        <li>• Files are stripped of metadata</li>
                        <li>• Reports are encrypted during transmission</li>
                        <li>• No account creation required</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-400 mb-2">
                        Community Initiative:
                      </p>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Created and maintained by St. Andrews trustee</li>
                        <li>• Free service - no cost to residents</li>
                        <li>• Privately funded hosting on secure servers</li>
                        <li>• Available throughout trustee term</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-400 mb-2">
                        Why This Matters:
                      </p>
                      <p className="text-gray-300">
                        We know reporting to estate security can lead to
                        intimidation when offenders discover who reported them.
                        This platform breaks that cycle by ensuring true
                        anonymity.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-200 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-xl shadow-2xl p-8 border border-gray-800"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Submit Anonymous Report
          </h2>

          {/* Incident Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Type of Incident *
            </label>
            <select
              value={formData.incidentType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  incidentType: e.target.value,
                }))
              }
              disabled={isSubmitting}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.incidentType ? "border-red-500" : "border-gray-700"
              }`}
            >
              <option value="" className="text-gray-400">
                Select incident type
              </option>
              <option value="housebreaking">Housebreaking & Theft</option>
              <option value="car-theft">Vehicle Theft/Hijacking</option>
              <option value="armed-robbery">Armed Robbery</option>
              <option value="assault">Assault/Violence</option>
              <option value="domestic-violence">Domestic Violence</option>
              <option value="drug-dealing">Drug Dealing/Trafficking</option>
              <option value="prostitution">Prostitution</option>
              <option value="noise-disturbance">
                Noise Disturbance/Parties
              </option>
              <option value="vandalism">Vandalism/Property Damage</option>
              <option value="trespassing">Trespassing</option>
              <option value="fraud">Fraud/Scams</option>
              <option value="corruption">Police/Official Corruption</option>
              <option value="suspicious-activity">Suspicious Activity</option>
              <option value="other">Other</option>
            </select>
            {errors.incidentType && (
              <p className="text-red-400 text-sm mt-1">
                {errors.incidentType}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Detailed Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              disabled={isSubmitting}
              placeholder="Please provide a detailed description of the incident..."
              rows={4}
              maxLength={500}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 resize-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.description ? "border-red-500" : "border-gray-700"
              }`}
            />
            <div className="flex justify-between items-center mt-2">
              <div>
                {errors.description && (
                  <p className="text-red-400 text-sm">{errors.description}</p>
                )}
              </div>
              <p
                className={`text-xs ${
                  formData.description.length > 450
                    ? "text-orange-400"
                    : "text-gray-500"
                }`}
              >
                {formData.description.length}/500 characters
              </p>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Attach Evidence (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors bg-gray-800/50">
              <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
              <p className="text-sm text-gray-300 mb-2">
                Upload images, PDFs, or Word documents
              </p>
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={isSubmitting}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-block font-medium ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Choose Files
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Max 10MB per file. Metadata will be automatically removed.
              </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-800 p-3 rounded-lg border border-gray-700"
                  >
                    <span className="text-sm text-gray-300 truncate flex-1">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      disabled={isSubmitting}
                      className="text-red-400 hover:text-red-300 ml-2 p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-medium transition-colors focus:ring-4 focus:ring-blue-500/50 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Anonymous Report"}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By submitting this form, you confirm that the information provided is
            truthful to the best of your knowledge.
          </p>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-white">St. Andrews Watch</p>
                <p className="text-sm text-gray-400">
                  Community trustee initiative • Free service for all residents
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <button
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                onClick={() => setShowPrivacyPolicy(true)}
              >
                Privacy Policy
              </button>
              <span className="hidden sm:inline text-gray-600">|</span>
              <button
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                onClick={() => setShowCommunityGuidelines(true)}
              >
                Community Guidelines
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-medium">About this initiative:</span> This
                platform was created by a St. Andrews trustee to provide a safe
                way to report incidents without fear of retaliation or
                intimidation.
              </p>
              <p className="text-xs text-gray-500">
                Privately funded • No cost to residents • Available throughout
                trustee term
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-gray-400 hover:text-gray-300 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6 text-sm">
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  1. Introduction
                </h3>
                <p className="text-gray-300">
                  Welcome to the St Andrews Watch reporting tool. This privacy
                  policy explains how we handle your information. Our core
                  principle is your anonymity.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  2. No Identification Collection
                </h3>
                <p className="text-gray-300">
                  This tool is designed to be anonymous. We do not ask for your
                  name, email address, or contact information. We do not use
                  cookies, analytics, or tracking technologies. We do not
                  collect or store your IP address, device information, or any
                  other metadata that could identify you.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  3. Information You Provide
                </h3>
                <p className="text-gray-300 mb-2">
                  The only information we receive is the data you voluntarily
                  enter into the form:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  <li>The incident type you select.</li>
                  <li>The description you write.</li>
                  <li>Any file you choose to upload.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  4. How Reports Are Processed
                </h3>
                <p className="text-gray-300">
                  Reports are sent directly to the trustee&apos;s secure email system
                  for review. We do not store any data in databases or permanent
                  storage systems. The trustee reviews each report to ensure no
                  identifying information is accidentally included before
                  sharing with fellow trustees for appropriate action.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  5. Data Security
                </h3>
                <p className="text-gray-300">
                  Reports are transmitted using encrypted connections. No
                  permanent storage systems are used. Email communications are
                  handled through secure, privacy-focused email services.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  6. Data Retention
                </h3>
                <p className="text-gray-300">
                  Reports are kept only as long as necessary to address the
                  issue reported. Once resolved or determined to be unfounded,
                  all related materials are permanently deleted.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  7. Your Consent
                </h3>
                <p className="text-gray-300">
                  By using this site, you consent to this privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Guidelines Modal */}
      {showCommunityGuidelines && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">
                Community Guidelines
              </h2>
              <button
                onClick={() => setShowCommunityGuidelines(false)}
                className="text-gray-400 hover:text-gray-300 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6 text-sm">
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  1. Purpose of this Tool
                </h3>
                <p className="text-gray-300">
                  The St Andrews Watch tool exists to provide a safe, anonymous
                  channel for residents to report serious issues affecting our
                  community, including criminal activity, theft, corruption, and
                  security breaches. The goal is to foster a safer, more
                  transparent, and better-managed precinct.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  2. Appropriate Use
                </h3>
                <p className="text-gray-300 mb-2">
                  This service should be used to report factual,
                  community-related concerns. You are encouraged to:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  <li>Provide clear, factual descriptions of incidents.</li>
                  <li>
                    Include relevant details like time, date, and location.
                  </li>
                  <li>Submit evidence (photos, documents) where possible.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  3. Prohibited Use
                </h3>
                <p className="text-gray-300 mb-2">
                  The misuse of this reporting tool is strictly prohibited. You
                  must not:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  <li>Make false, malicious, or frivolous reports.</li>
                  <li>
                    Use the tool for personal disputes, harassment, or
                    defamation.
                  </li>
                  <li>Submit reports known to be untrue or misleading.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  4. Report Review Process
                </h3>
                <p className="text-gray-300">
                  All reports are carefully reviewed by trustees. Reports that
                  lack substance or appear to be false will be discarded. We
                  focus our efforts on genuine community safety concerns and
                  will not attempt to identify or pursue reporters of
                  unsubstantiated claims.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  5. Our Commitment
                </h3>
                <p className="text-gray-300">
                  The trustees managing this tool are committed to reviewing all
                  reports seriously, objectively, and confidentially. We are
                  dedicated to using the information to advocate for the best
                  interests of the St Andrews community.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700 text-center">
                <p className="text-gray-300 font-medium">
                  Thank you for helping us build a better community.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
