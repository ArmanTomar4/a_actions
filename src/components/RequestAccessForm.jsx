import React, { useState } from 'react';
import './RequestAccessForm.css';

const RequestAccessForm = ({ isOpen, onClose, formType = "Access" }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    projectDescription: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Google Apps Script Web App URL
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyVpUTG0JrI_pSB-eflTOUxYVw6bWeCsCZGtbnhNWRHP-w4kcwLVDJQI84j8hx-vvyBww/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: formType,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          jobTitle: formData.jobTitle,
          company: formData.company,
          projectDescription: formData.projectDescription,
          timestamp: new Date().toISOString()
        })
      });

      // Since we're using no-cors, we can't check response status
      // But we'll assume success if no error is thrown
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        jobTitle: '',
        company: '',
        projectDescription: ''
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus('');
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="request-form-overlay" onClick={onClose}>
      <div className="request-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="request-form-container">
          {/* Left Section - Form */}
          <div className="request-form-left-section">
            <div className="request-form-header">
              <h1 className="request-form-title">Request {formType}</h1>
              <button className="request-form-close" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="request-form">
              <div className="form-group">
                <label className="form-label">
                  FULL NAME <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  EMAIL ADDRESS <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">PHONE NUMBER</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">JOB TITLE</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">COMPANY/INSTITUTION</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  TELL US ABOUT YOUR PROJECT, A BIT OF CONTEXT WILL ALLOW US TO CONNECT YOU TO THE RIGHT TEAM FASTER:
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                />
              </div>

              <button 
                type="submit" 
                className="form-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="form-success-message">
                  ✅ Form submitted successfully! Thank you.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-error-message">
                  ❌ Error submitting form. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Right Section - Visual */}
          <div className="request-form-right-section">
            <div className="request-form-abstract-graphics">
              <img 
                src="/are_you_ready.svg" 
                alt="Are you ready illustration" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1
                }}
                onError={(e) => {
                  console.error('Failed to load are_you_ready.svg:', e);
                  e.target.style.display = 'none';
                }}
                onLoad={() => {
                  console.log('Successfully loaded are_you_ready.svg');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestAccessForm;
