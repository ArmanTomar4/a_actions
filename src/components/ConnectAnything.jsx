import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConnectAnything.css';
import gsap from 'gsap';

const ConnectAnything = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [animatingIcon, setAnimatingIcon] = useState(null);
    const innerRef = useRef(null);
    const infoRef = useRef(null);
    const timelineRef = useRef(null);
    const containerRef = useRef(null);

    // Icon data with unique info for each integration
    const iconData = {
        'r1c1': { name: 'Slack', info: 'Connect your team communication with seamless Slack integration for real-time notifications and updates.' },
        'r1c2': { name: 'GitHub', info: 'Integrate with GitHub for automated workflows, code reviews, and repository management.' },
        'r1c3': { name: 'Jira', info: 'Streamline project management with Jira integration for issue tracking and sprint planning.' },
        'r1c4': { name: 'Notion', info: 'Sync your documentation and knowledge base with powerful Notion integration.' },
        'r1c5': { name: 'Figma', info: 'Connect design workflows with Figma for seamless design-to-development handoffs.' },
        'r1c6': { name: 'Trello', info: 'Organize projects with Trello board integration for visual task management.' },
        'r1c7': { name: 'Discord', info: 'Enhance community engagement with Discord bot integration and notifications.' },
        'r1c8': { name: 'Zoom', info: 'Schedule and manage meetings with automated Zoom integration and calendar sync.' },
        'r1c9': { name: 'Salesforce', info: 'Connect your CRM with Salesforce integration for customer data synchronization.' },
        'r2c1': { name: 'HubSpot', info: 'Automate marketing workflows with HubSpot CRM and marketing automation tools.' },
        'r2c2': { name: 'Stripe', info: 'Process payments securely with Stripe integration for subscription and billing management.' },
        'r2c3': { name: 'Shopify', info: 'Connect e-commerce operations with Shopify for inventory and order management.' },
        'r2c4': { name: 'Mailchimp', info: 'Automate email marketing campaigns with Mailchimp integration and audience segmentation.' },
        'r2c5': { name: 'Zapier', info: 'Create powerful automation workflows connecting hundreds of apps through Zapier.' },
        'r2c6': { name: 'Airtable', info: 'Organize data with flexible Airtable database integration and custom workflows.' },
        'r2c7': { name: 'Asana', info: 'Manage projects and tasks with Asana integration for team collaboration.' },
        'r2c8': { name: 'Monday', info: 'Streamline work management with Monday.com integration for project tracking.' },
        'r2c9': { name: 'ClickUp', info: 'Centralize productivity with ClickUp integration for all-in-one workspace management.' },
        'r3c1': { name: 'Google Drive', info: 'Sync files and documents with Google Drive integration for cloud storage access.' },
        'r3c2': { name: 'Dropbox', info: 'Share and collaborate on files with Dropbox integration and version control.' },
        'r3c3': { name: 'OneDrive', info: 'Connect Microsoft ecosystem with OneDrive integration for seamless file sharing.' },
        'r3c4': { name: 'AWS S3', info: 'Scale storage solutions with AWS S3 integration for enterprise-grade file management.' },
        'r3c5': { name: 'Firebase', info: 'Build real-time applications with Firebase integration for backend services.' },
        'r3c6': { name: 'Vercel', info: 'Deploy and host applications with Vercel integration for modern web development.' },
        'r3c7': { name: 'Netlify', info: 'Streamline deployment workflows with Netlify integration for JAMstack applications.' },
        'r3c8': { name: 'Heroku', info: 'Deploy applications easily with Heroku integration for cloud platform management.' },
        'r3c9': { name: 'Docker', info: 'Containerize applications with Docker integration for consistent deployment environments.' },
        'r4c1': { name: 'Kubernetes', info: 'Orchestrate containers with Kubernetes integration for scalable application management.' },
        'r4c2': { name: 'Jenkins', info: 'Automate CI/CD pipelines with Jenkins integration for continuous deployment.' },
        'r4c3': { name: 'GitLab', info: 'Manage code repositories with GitLab integration for DevOps workflows.' },
        'r4c4': { name: 'Bitbucket', info: 'Collaborate on code with Bitbucket integration for team development workflows.' },
        'r4c5': { name: 'CircleCI', info: 'Implement continuous integration with CircleCI for automated testing and deployment.' },
        'r4c6': { name: 'Travis CI', info: 'Build and test code with Travis CI integration for continuous integration workflows.' },
        'r4c7': { name: 'Azure DevOps', info: 'Manage development lifecycle with Azure DevOps integration for enterprise teams.' },
        'r4c8': { name: 'Terraform', info: 'Manage infrastructure as code with Terraform integration for cloud resource automation.' },
        'r4c9': { name: 'Ansible', info: 'Automate configuration management with Ansible integration for infrastructure deployment.' },
        'r5c1': { name: 'Datadog', info: 'Monitor application performance with Datadog integration for comprehensive observability.' },
        'r5c2': { name: 'New Relic', info: 'Track application metrics with New Relic integration for performance monitoring.' },
        'r5c3': { name: 'Sentry', info: 'Monitor errors and performance with Sentry integration for application health tracking.' },
        'r5c4': { name: 'Splunk', info: 'Analyze machine data with Splunk integration for operational intelligence.' },
        'r5c5': { name: 'Elastic', info: 'Search and analyze data with Elasticsearch integration for powerful data insights.' },
        'r5c6': { name: 'Grafana', info: 'Visualize metrics with Grafana integration for beautiful monitoring dashboards.' },
        'r5c7': { name: 'Prometheus', info: 'Collect metrics with Prometheus integration for system and application monitoring.' },
        'r5c8': { name: 'PagerDuty', info: 'Manage incident response with PagerDuty integration for reliable alerting systems.' },
        'r5c9': { name: 'Twilio', info: 'Enable communication features with Twilio integration for SMS and voice capabilities.' }
    };

    // Handle proximity hover effect
    const handleMouseEnter = (row, col) => {
        // Get all surrounding positions (including the hovered one)
        const positions = [];
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 1 && r <= 5 && c >= 1 && c <= 9) {
                    positions.push(`r${r}c${c}`);
                }
            }
        }

        // Add glow effect to all surrounding items
        positions.forEach(pos => {
            const item = document.querySelector(`[data-position="${pos}"]`);
            if (item) {
                item.classList.add('proximity-glow');
            }
        });
    };

    const handleMouseLeave = () => {
        // Remove glow effect from all items
        const allItems = document.querySelectorAll('.connect-grid-item');
        allItems.forEach(item => {
            item.classList.remove('proximity-glow');
        });
    };

    // Handle icon click with animations
    const handleIconClick = (iconKey) => {
        // If clicking the same icon that's already selected, close the info section
        if (selectedIcon === iconKey && isInfoOpen) {
            closeInfoSection();
            return;
        }

        // If info section is open with different icon, close first then open new
        if (isInfoOpen && selectedIcon !== iconKey) {
            closeInfoSection(() => {
                // After closing, open with new icon
                setTimeout(() => openInfoSection(iconKey), 100);
            });
            return;
        }

        // Open info section for new icon
        openInfoSection(iconKey);
    };

    const openInfoSection = (iconKey) => {
        setSelectedIcon(iconKey);
        setAnimatingIcon(iconKey);
        setIsInfoOpen(true); // Show info section immediately so placeholder exists
        
        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        // Get the clicked icon element
        const clickedIcon = document.querySelector(`[data-position="${iconKey}"] .connect-icon`);
        
        // Wait a frame for the info section to render, then calculate positions
        requestAnimationFrame(() => {
            const iconRect = clickedIcon.getBoundingClientRect();
            const placeholder = document.querySelector('.info-icon-placeholder');
            
            let targetX = 0;
            let targetY = 0;
            
            if (placeholder) {
                const placeholderRect = placeholder.getBoundingClientRect();
                // Calculate center of placeholder relative to icon's current position
                const targetCenterX = placeholderRect.left + placeholderRect.width / 2;
                const targetCenterY = placeholderRect.top + placeholderRect.height / 2;
                const iconCenterX = iconRect.left + iconRect.width / 2;
                const iconCenterY = iconRect.top + iconRect.height / 2;
                
                targetX = targetCenterX - iconCenterX - 50; // Move 10px left
                targetY = targetCenterY - iconCenterY;
            }

            // Create GSAP timeline for synchronized animations
            const tl = gsap.timeline({
                ease: "power2.inOut"
            });

            timelineRef.current = tl;

            // Animate everything simultaneously
            tl.to(innerRef.current, {
                x: "-50%",
                duration: 0.8,
                ease: "power2.inOut"
            }, 0)
            .fromTo(infoRef.current, 
                {
                    x: "100%",
                    opacity: 0
                },
                {
                    x: "0%",
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.inOut"
                }, 0)
            .to(clickedIcon, {
                scale: 4.5,
                x: targetX,
                y: targetY,
                zIndex: 999,
                duration: 0.8,
                ease: "none"
            }, 0);
        });
    };

    const closeInfoSection = (callback) => {
        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        setIsInfoOpen(false);
        
        // Get the currently selected icon
        const selectedIconElement = animatingIcon ? 
            document.querySelector(`[data-position="${animatingIcon}"] .connect-icon`) : null;

        // Create GSAP timeline for closing
        const tl = gsap.timeline({
            ease: "power2.inOut",
            onComplete: () => {
                // Reset all icons to their original state and restore hover functionality
                const allIcons = document.querySelectorAll('.connect-icon');
                allIcons.forEach(icon => {
                    gsap.set(icon, {
                        scale: 1,
                        x: 0,
                        y: 0,
                        zIndex: 'auto',
                        opacity: 0.7,
                        filter: "grayscale(1)",
                        clearProps: "all"
                    });
                });
                
                // Re-enable hover effects by removing any inline styles that might interfere
                const allGridItems = document.querySelectorAll('.connect-grid-item');
                allGridItems.forEach(item => {
                    item.style.pointerEvents = 'auto';
                });
                
                setSelectedIcon(null);
                setAnimatingIcon(null);
                if (callback) callback();
            }
        });

        timelineRef.current = tl;

        // Animate everything back simultaneously
        tl.to(innerRef.current, {
            x: "0%",
            duration: 0.6,
            ease: "power2.inOut"
        }, 0)
        .to(infoRef.current, {
            x: "100%",
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut"
        }, 0);

        // Animate the icon back if it exists
        if (selectedIconElement) {
            tl.to(selectedIconElement, {
                scale: 1,
                x: 0,
                y: 0,
                zIndex: 'auto',
                opacity: 0.7,
                filter: "grayscale(1)",
                duration: 0.6,
                ease: "power2.inOut"
            }, 0);
        }
    };

    // Cleanup timeline on unmount
    useEffect(() => {
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, []);

    // Render corner plus SVGs that stick to the grid-item corners
    const renderCornerPluses = () => (
        <>
            <svg className="svg-plus" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                <line x1="4.37114e-08" y1="3.5" x2="7" y2="3.5" stroke="#84D04D" />
                <line x1="3.5" y1="7" x2="3.5" y2="-2.18557e-08" stroke="#84D04D" />
            </svg>
            <svg className="svg-plus-right" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                <line x1="4.37114e-08" y1="3.5" x2="7" y2="3.5" stroke="#84D04D" />
                <line x1="3.5" y1="7" x2="3.5" y2="-2.18557e-08" stroke="#84D04D" />
            </svg>
            <svg className="svg-plus-bottom" xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 7 7" fill="none">
                <line x1="4.37114e-08" y1="3.5" x2="7" y2="3.5" stroke="#84D04D" />
                <line x1="3.5" y1="7" x2="3.5" y2="-2.18557e-08" stroke="#84D04D" />
            </svg>
        </>
    );

    // Generate grid items for 5 rows and 9 columns
    const generateGridItems = () => {
        const items = [];
        for (let row = 1; row <= 5; row++) {
            for (let col = 1; col <= 9; col++) {
                const svgPath = `/r${row}c${col}.svg`;
                const key = `r${row}c${col}`;

                items.push(
                    <div
                        key={key}
                        className="connect-grid-item"
                        data-position={key}
                        onMouseEnter={() => handleMouseEnter(row, col)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleIconClick(key)}
                        style={{ cursor: 'pointer' }}
                    >
                        {renderCornerPluses()}
                        <img
                            src={svgPath}
                            alt={`Integration ${key}`}
                            className={`connect-icon ${selectedIcon === key ? 'selected' : ''}`}
                            loading="lazy"
                        />
                    </div>
                );
            }
        }
        return items;
    };

    return (
        <div className="connect-anything-container" ref={containerRef}>
            <svg className="connect-top-svg" xmlns="http://www.w3.org/2000/svg" width="927" height="26" viewBox="0 0 927 26" fill="none">
                <path d="M927 0H0L46 26H881L927 0Z" fill="#1a1a1a" />
            </svg>
            <svg className="connect-bottom-svg" xmlns="http://www.w3.org/2000/svg" width="927" height="26" viewBox="0 0 927 26" fill="none">
                <path d="M927 26H0L46 0H881L927 26Z" fill="#1a1a1a" />
            </svg>

            <div className="connect-anything-inner" ref={innerRef}>
                <div className="connect-main-content">
                    <h2 className="connect-anything-title">Connect anything</h2>
                    <div className="connect-anything-divider"></div>
                    <div className="connect-anything-grid">
                        {generateGridItems()}
                    </div>
                </div>
            </div>

            {/* Info Section - positioned outside for fixed positioning */}
            <div className="info-section" ref={infoRef}>
                {/* Close button positioned on left border */}
                {isInfoOpen && (
                    <motion.button 
                        className="close-info-btn"
                        onClick={() => closeInfoSection()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        zIndex={1000}
                    >
                        ×
                    </motion.button>
                )}
                
                <AnimatePresence mode="wait">
                    {isInfoOpen && selectedIcon && iconData[selectedIcon] && (
                        <motion.div 
                            key={selectedIcon}
                            className="info-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            {/* The enlarged icon is handled by GSAP, so we don't need it here */}
                            <div className="info-icon-placeholder"></div>

                            <motion.div 
                                className="info-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                <h3 className="info-title">{iconData[selectedIcon].name}</h3>
                                <p className="info-description">{iconData[selectedIcon].info}</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ConnectAnything;

