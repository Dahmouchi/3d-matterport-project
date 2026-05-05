/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, CheckCircle } from "lucide-react";

type CtaDict = {
  heading: string;
  subheading: string;
  formTitle: string;
  formTitleHighlight: string;
  labelName: string;
  placeholderName: string;
  labelEmail: string;
  placeholderEmail: string;
  labelPhone: string;
  placeholderPhone: string;
  labelCity: string;
  placeholderCity: string;
  labelProjectType: string;
  selectDefault: string;
  projectTypes: Record<string, string>;
  labelSurface: string;
  surfaces: Record<string, string>;
  labelObjective: string;
  objectives: string[];
  labelLink: string;
  placeholderLink: string;
  labelMessage: string;
  placeholderMessage: string;
  submitButton: string;
  successTitle: string;
  successText: string;
  contactPhone: string;
  contactPhoneDesc: string;
  contactEmail: string;
  contactEmailDesc: string;
};

const CTASection = ({ dict }: { dict: CtaDict }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
    city: "",
    objectives: "",
    surface: "",
    link: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/reservations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            projectType: formData.projectType,
            message: formData.message,
            city: formData.city,
            objectives: formData.objectives,
            surface: formData.surface,
            link: formData.link,
          }),
        },
      );

      if (res2.ok) {
        alert("✅ Email sent successfully");
      } else {
        console.error("❌ Failed to send email");
        console.log(res2);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: dict.contactPhone,
      value: "06 64 09 10 68",
      description: dict.contactPhoneDesc,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: dict.contactEmail,
      value: "Contact@build360.ma ",
      description: dict.contactEmailDesc,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white  mb-6">
            {dict.heading}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {dict.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1  gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl lg:p-8 p-4 border border-gray-700 shadow-2xl">
              <h3 className="lg:text-2xl text-xl font-bold dark:text-white mb-6">
                {dict.formTitle}{" "}
                <span className="text-amber-400 font-bold">
                  {dict.formTitleHighlight}
                </span>
              </h3>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        {dict.labelName}
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder={dict.placeholderName}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        {dict.labelEmail}
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder={dict.placeholderEmail}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        {dict.labelPhone}
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder={dict.placeholderPhone}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        {dict.labelCity}
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder={dict.placeholderCity}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        {dict.labelProjectType}
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2 focus:border-[#f6ba13] focus:outline-none"
                        required
                      >
                        <option value="">{dict.selectDefault}</option>
                        <option value="immobilier">
                          {dict.projectTypes.immobilier}
                        </option>
                        <option value="hotel">{dict.projectTypes.hotel}</option>
                        <option value="commerce">
                          {dict.projectTypes.commerce}
                        </option>
                        <option value="architecture">
                          {dict.projectTypes.architecture}
                        </option>
                        <option value="autre">{dict.projectTypes.autre}</option>
                      </select>
                    </div>

                    {/* Surface */}
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        {dict.labelSurface}
                      </label>
                      <select
                        name="surface"
                        value={formData.surface}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2 focus:border-[#f6ba13] focus:outline-none"
                        required
                      >
                        <option value="">{dict.selectDefault}</option>
                        <option value="<100">{dict.surfaces["lt100"]}</option>
                        <option value="100-300">
                          {dict.surfaces["100-300"]}
                        </option>
                        <option value="300-600">
                          {dict.surfaces["300-600"]}
                        </option>
                        <option value="600+">{dict.surfaces["600+"]}</option>
                      </select>
                    </div>
                  </div>

                  {/* Objective */}
                  <div>
                    <label className="block text-gray-100 text-sm font-medium mb-2">
                      {dict.labelObjective}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {dict.objectives.map((obj) => (
                        <label
                          key={obj}
                          className="flex items-center space-x-2 text-gray-200"
                        >
                          <input
                            type="checkbox"
                            name="objectives"
                            value={obj}
                            checked={formData.objectives?.includes(obj)}
                            onChange={handleInputChange}
                            className="rounded border-gray-600 bg-gray-700/50 text-[#f6ba13] focus:ring-[#f6ba13]"
                          />
                          <span>{obj}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Website link */}
                  <div>
                    <label className="block text-gray-100 text-sm font-medium mb-2">
                      {dict.labelLink}
                    </label>
                    <Input
                      type="text"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                      placeholder={dict.placeholderLink}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-100 text-sm font-medium mb-2">
                      {dict.labelMessage}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13] min-h-[120px]"
                      placeholder={dict.placeholderMessage}
                    />
                  </div>

                  {/* CTA */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r cursor-pointer from-[#f6ba13] to-orange-400 hover:from-orange-500 hover:to-orange-700 text-white py-6 rounded-lg font-semibold"
                  >
                    {dict.submitButton}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {dict.successTitle}
                  </h4>
                  <p className="text-gray-300">{dict.successText}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-[#f6ba13]/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-[#f6ba13] to-orange-400 rounded-lg text-white">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{info.title}</h4>
                    </div>
                  </div>
                  <p className="dark:text-gray-300 text-gray-50 font-medium">
                    {info.value}
                  </p>
                  <p className="dark:text-gray-500 text-slate-50 text-sm">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
