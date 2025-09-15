import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConnectAnything.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ConnectAnything = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [animatingIcon, setAnimatingIcon] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const innerRef = useRef(null);
    const infoRef = useRef(null);
    const timelineRef = useRef(null);
    const containerRef = useRef(null); 
    const closeBtnRef = useRef(null);
    const iconTweenRef = useRef(null);
    const iconAtPanelRef = useRef(false);

    // Icon data with unique info for each integration
    const iconData = {
        'r1c1': { 
            name: 'Webflow', 
            info:"Webflow is a no-code website design and hosting platform, letting users build responsive sites, launch online stores, and maintain content without coding.",
            hasOAuth: false,
            hasBearerToken: false,
            hasApiKey: true,
            toolsCount: 21,
            triggersCount: 0,
            category: 'Design & Creative Tools, E-commerce',
            tools: [
                { name: 'Create Webflow Collection Item', description: 'This tool creates a new item in a specified webflow collection. it requires the collection id and field data parameters (including required name and slug) and optionally accepts an is draft flag. authentication is assumed to be provided, and the collection id can be obtained by using the webflow list collections tool.' },
                { name: 'Delete Webflow Collection Item', description: 'This tool allows you to delete a specific item from a collection in webflow. it permanently removes the item from the specified collection and complements existing collection management tools. the tool requires a collection id to identify the collection and an item id to identify the item, with an optional cms locale id parameter for handling multi-language content.' },
                { name: 'Fulfill Order', description: "This tool allows you to mark an order as fulfilled in webflow's e-commerce system. it's essential for managing order fulfillment in webflow stores." },
                { name: 'Get Collection Details', description: "Retrieves a specific collection by its id from a webflow site. this endpoint returns detailed information about the collection, including its name, slug, and schema. it requires a valid collection id as a parameter and complements the webflow list collections tool for accessing specific collection details. this tool requires the 'cms:read' authentication scope." }
            ]
        },
        'r4c7': { 
            name: 'Google Drive', 
            info: 'Google Drive is a cloud storage solution for uploading, sharing, and collaborating on files across devices, with robust search and offline access',
            hasOAuth: true,
            hasApiKey: true,
            hasBearerToken: false,
            toolsCount: 51,
            triggersCount: 1,
            category: 'Document & File Management',
            tools: [
                { name: 'Add file sharing pref...', description: "Modifies sharing permissions for an existing google drive file, granting a specified role to a user, group, domain, or 'anyone'" },
                { name: 'Create comment', description: 'Tool to create a comment on a file. use when you need to add a new comment to a specific file in google drive.' },
                { name: 'Create shared drive', description: 'Tool to create a comment on a file. use when you need to add a new comment to a specific file in google drive.' },
                { name: 'Copy file', description: 'Duplicates an existing file in google drive, identified by its `file id`.' },
            ]
        },
        'r1c3': { 
            name: 'Shopify', 
            info: 'Shopify is an e-commerce platform enabling merchants to create online stores, manage products, and process payments with themes, apps, and integrated marketing tools',
            hasOAuth: true,
            hasBearerToken: false,
            hasApiKey:true,
            toolsCount: 28,
            triggersCount: 0,
            category: 'E-commerce',
            tools: [
                { name: 'Add product to custo...', description: 'Adds a product to an existing *custom collection*, optionally specifying its `position` if the collection is manually sorted.' },
                { name: 'Count product images', description: 'Retrieves the total count of images for a shopify product, useful for inventory management or display logic; the provided `product id` must exist in the store.' },
                { name: 'Create a custom collection', description: "Creates a new custom collection in a shopify store, requiring a unique title for manually curated product groupings (e.g., 'new arrivals', 'seasonal specials')." },
                { name: 'Create customer', description: 'Tool to create a new customer in shopify. use when you need to add a new customer record to the store.' }
            ]
        },
        'r1c4': { 
            name: 'Jira', 
            info: 'A tool for bug tracking, issue tracking, and agile project management. Jira is very useful tool for productivity even for professionals',
            hasOAuth: true,
            hasBearerToken: false,
            hasApiKey: true,
            toolsCount: 46,
            triggersCount: 3,
            category: 'productivity, ticketing, popular',
            tools: [
                { name: 'Create issue', description: "Creates a new jira issue (e.g., bug, task, story) in a specified project." },
                { name: 'Update issue', description: 'Update an existing issue in Jira' },
                { name: 'Create project', description: "Creates a new jira project with required lead, template, and type configuration." },
                { name: 'Query issues', description: 'Query issues in Jira' }
            ]
        },
        'r1c5': { 
            name: 'Zoom', 
            info: 'Zoom is a video conferencing and online meeting platform featuring breakout rooms, screen sharing, and integrations with various enterprise tools.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 17,
            triggersCount: 0,
            category: 'Communication & Collaboration',
            tools: [
                { name: 'Add a meeting registrant', description: "This text guides on creating and customizing a user's registration for a zoom meeting, with a max of 4,999 registrants. preconditions include the host being licensed. api scopes and a light rate limit apply." },
                { name: 'Add a webinar registrant', description: 'Zoom users with a webinar plan can create and manage webinars, broadcasting to up to 10,000 attendees. registration requires a pro plan, specific permissions, and is governed by a "light" rate limit.' },
                { name: 'Create a meeting', description: "Enable zoom meeting creation via user-level apps with 'me'. 'start url' for hosts expires in 2 hours, or 90 days for 'custcreate' users. renew via api, capped at 100 requests/day. requires 'meeting:write' permission, subject to medium rate limit." },
                { name: 'Delete meeting recordings', description: "Summary: to delete all meeting recordings, ensure the user's account has cloud recording enabled. required permissions include `recording:write:admin` and `recording:write` with a `light` rate limit label." }
            ]
        },
        'r1c6': { 
            name: 'Google Calendar', 
            info: 'Google Calendar is a time management tool providing scheduling features, event reminders, and integration with email and other apps for streamlined organization.',
            hasOAuth: true,
            hasBearerToken: true,
            toolsCount: 28,
            triggersCount: 2,
            category: 'Scheduling & Booking',
            tools: [
                { name: 'Create event', description: 'Creates an event on a google calendar, needing rfc3339 utc start/end times (end after start) and write access to the calendar. by default, adds the organizer as an attendee unless exclude organizer is set to true.' },
                { name: 'Update event', description: 'Updates an existing event by `event id` in a google calendar; this is a full put replacement, so provide all desired fields as unspecified ones may be cleared or reset.' },
                { name: 'Create calendar', description: 'Create a new calendar in Google Calendar' },
                { name: 'Delete event', description: "Deletes a specified event by `event id` from a google calendar (`calendar id`); this action is idempotent and raises a 404 error if the event is not found." }
            ]
        },
        'r1c7': { 
            name: 'Google Ads', 
            info: 'Google Ads, is an online advertising platform developed by Google, where advertisers bid to display brief advertisements, service offerings, product listings, and videos to web users.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 6,
            triggersCount: 0,
            category: 'Advertising & Marketing',
            tools: [
                { name: 'Create campaign', description: 'Create a new campaign' },
                { name: 'Update campaign', description: 'Update an existing campaign' },
                { name: 'Get campaign', description: 'Getcampaignbyname tool will run a sql getcampaignbyname in google ads.' },
                { name: 'Delete campaign', description: 'Delete an existing campaign' }
            ]
        },
        'r1c8': { 
            name: 'Supabase', 
            info: 'Supabase is an open-source backend-as-a-service providing a Postgres database, authentication, storage, and real-time subscription APIs for building modern applications.',
            hasOAuth: true,
            hasBearerToken: false,
            hasApiKey: true,
            toolsCount: 79,
            triggersCount: 0,
            category: 'Developer Tools & DevOps',
            tools: [
                { name: 'Create project api key', description: "Creates a 'publishable' or 'secret' api key for an existing supabase project, optionally with a description; 'secret' keys can have customized jwt templates." },
                { name: 'Delete project api key', description: "Permanently deletes a specific api key (identified by `id`) from a supabase project (identified by `ref`), revoking its access." },
                { name: 'Get third-party integration', description: "Retrieves the detailed configuration for a specific third-party authentication (tpa) provider, identified by `tpa id`, within an existing supabase project specified by `ref`." },
                { name: 'List third-party integrations', description: "Lists all configured third-party authentication provider integrations for an existing supabase project (using its `ref`), suitable for read-only auditing or verifying current authentication settings." }
            ]
        },
        'r1c9': { 
            name: 'Box', 
            info: 'Cloud content management and file sharing service for businesses.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 273,
            triggersCount: 0,
            category: 'Document & File Management',
            tools: [
                { name: 'Add classification to file', description: "Adds a classification to a file by specifying the label of the classification to add. this api can also be called by including the enterprise id in the url explicitly, for example `/files/:id//enterprise 12345/securityclassification-6vmvochwuwo`." },
                { name: 'Add classification to folder', description: "Adds a classification to a folder by specifying the label of the classification to add. this api can also be called by including the enterprise id in the url explicitly, for example `/folders/:id/enterprise 12345/securityclassification-6vmvochwuwo`." },
                { name: 'Add domain to list of allowed collaboration domains', description: "Creates a new entry in the list of allowed domains to allow collaboration for." },
                { name: 'Add initial classifications', description: "When an enterprise does not yet have any classifications, this api call initializes the classification template with an initial set of classifications. if an enterprise already has a classification, the template will already exist and instead an api call should be made to add additional classifications." }
            ]
        },
        'r2c1': { 
            name: 'Discordbot', 
            info: 'Discordbot refers to automated programs on Discord servers, performing tasks like moderation, music playback, and user engagement to enhance community interactions.',
            hasOAuth: true,
            hasBearerToken: true,
            toolsCount: 164,
            triggersCount: 0,
            category: 'Collaboration & Communication',
            tools: [
                { name: 'Add recipient to group channel', description: 'Adds a user to a discord group direct message (dm) channel.' },
                { name: 'Update guild member information', description: "Adds a user (who is not already a member) to a guild using their `access token` (which must have `guilds.join` scope), optionally setting nickname, roles, mute/deaf status, or flags." },
                { name: 'Assign role to guild member', description: "Assigns a role to a guild member, provided the bot has 'manage roles' permission in the guild and the role to be assigned is hierarchically lower than the bot's highest role." },
                { name: 'Add reaction to message', description: 'Adds an emoji reaction from the authenticated user/bot to a specific message in a discord channel; does not return information about existing reactions.' }
            ]
        },
        'r2c3': { 
            name: 'Google Maps', 
            info: 'Google Maps is a mapping and navigation service providing location-based information and directions.',
            hasOAuth: true,
            hasBearerToken: false,
            hasApiKey: true,
            toolsCount: 7,
            triggersCount: 0,
            category: 'Mapping & Navigation',
            tools: [
                { name: 'Get directions', description: 'Fetches detailed directions between an origin and a destination, supporting intermediate waypoints and various travel modes.' },
                { name: 'Get reviews', description: 'Retrieve reviews for a location' },
                { name: 'Get distance', description: 'Calculates travel distance and time for a matrix of origins and destinations. supports different modes of transportation and options like departure/arrival times. use when needing to determine travel metrics between multiple points.' },
                { name: 'Get traffic', description: 'Retrieve traffic information for a location' }
            ]
        },
        'r2c2': { 
            name: 'Miro', 
            info: 'Miro is a collaborative online whiteboard enabling teams to brainstorm ideas, design wireframes, plan workflows, and manage projects visually.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 15,
            triggersCount: 0,
            category: 'Design & Creative Tools, Productivity & Project Management',
            tools: [
                { name: 'Create board', description: 'Create a new board' },
                { name: 'Get Connector', description: 'Tool to retrieve a connector' },
                { name: 'Get board', description: 'Tool to retrieve a board' },
                { name: 'Delete board', description: 'Tool to delete an existing board' }
            ]
        },
        'r2c4': { 
            name: 'Excel', 
            info: 'Microsoft Excel is a powerful spreadsheet application for data analysis, calculations, and visualization, enabling users to organize and process data with formulas, charts, and pivot tables.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 45,
            triggersCount: 0,
            category: 'Data & Analytics',
            tools: [
                { name: 'Add Chart', description: 'Tool to create a new board. use when you need to set up a board with a specific name, description, and policies. example: "create a new board named project plan".' },
                { name: 'Delete App Card Item', description: 'Tool to delete an app card item from a board. use when you need to remove an app card item created by your app after it is no longer needed.' },
                { name: 'Get Boards', description: 'Tool to retrieve accessible boards with optional filters. use when you need to list or search boards by team, project, owner, or keywords.' },
                { name: 'Get Connectors', description: 'Tool to retrieve a list of connectors on a board. use after confirming the board id and when you need to page through connector items.' }
            ]
        },
        'r2c5': { 
            name: 'Anthropic', 
            info: 'Anthropic is a research organization focused on developing and advancing AI models, particularly in the realm of natural language processing and machine learning.',
            hasOAuth: false,
            hasBearerToken: false,
            hasApiKey: true,
            toolsCount: 4,
            triggersCount: 0,
            category: 'Automation & Integration',
            tools: [
                { name: 'Create Message', description: 'Tool to create a new message completion. use when you need to generate assistant text given a conversation history.' },
                { name: 'Get Model', description: 'Tool to retrieve details of a specific model by its id. use after confirming the model id is valid.' },
                { name: 'List models', description: 'Tool to list available models. use when you need to see which models are available before selection.' },
                { name: 'Prompt Caching', description: 'Tool to cache and reuse prompt content to reduce costs and latency. use after you have static prompt portions you intend to reuse across calls.' }
            ]
        },
        'r2c6': { 
            name: 'Adobe', 
            info: 'Adobe provides creative software and digital media solutions, including Photoshop and Acrobat, empowering individuals and enterprises to design, edit, and distribute content across multiple formats',
            hasOAuth: false,
            hasApiKey: true,
            hasBearerToken: false,
            toolsCount: 0,
            triggersCount: 0,
            category: 'Design & Creative Tools',
            tools: [
                { name: 'No tools available' },
            ]
        },
        'r2c7': { 
            name: 'snowflake', 
            info: 'Snowflake is a cloud-based data warehouse offering elastic scaling, secure data sharing, and SQL analytics across multiple cloud environments.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 16,
            triggersCount: 0,
            category: 'Data & Analytics',
            tools: [
                { name: 'Cancel Statement Execution', description: 'Cancels the execution of a running sql statement. use this action to stop a long-running query.' },
                { name: 'Execute SQL', description: 'Tool to execute a sql statement and return the resulting data. use when you need to query data from snowflake' },
                { name: 'Fetch Catalog Integration', description: 'Fetches details of a specific catalog integration.' },
                { name: 'Get Active Scheduled Maintenances', description: 'Retrieves a list of any active scheduled maintenances currently in the in progress or verifying state.' }
            ]
        },
        'r2c8': { 
            name: 'Microsoft Dynamics 365', 
            info: 'Dynamics 365 from Microsoft combines CRM, ERP, and productivity apps to streamline sales, marketing, customer service, and operations in one integrated platform.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 17,
            triggersCount: 0,
            category: 'CRM, Sales & Customer Support, Productivity & Project Management',
            tools: [
                { name: 'Create Account', description: 'Creates a new account entity record in dynamics crm using the web api.' },
                { name: 'Create Contact', description: 'Creates a new contact entity record in dynamics crm using the web api.' },
                { name: 'Create Lead', description: 'Creates a new lead entity record in dynamics crm using the web api.' },
                { name: 'Create Opportunity', description: 'Creates a new opportunity entity record in dynamics crm using the web api.' }
            ]
        },
        'r2c9': { 
            name: 'Meta Ads', 
            info: 'Meta Ads API.',
            hasOAuth: true,
            hasBearerToken: false,
            hasApiKey:true,
            toolsCount: 16,
            triggersCount: 0,
            category: 'Social Media',
            tools: [
                { name: 'Create Ad', description: 'Create a new ad within an ad set using the meta marketing api. supports various ad formats including image, video, carousel, and collection ads.' },
                { name: 'Create Ad creative', description: "Create a new ad creative using the meta marketing api. ad creatives are reusable visual and interactive elements that define how your ad looks and behaves: - can be used in multiple ads - support various formats (image, video, carousel) - include text, media, and call-to-action buttons - must follow meta's ad policies" },
                { name: 'Create Ad set', description: 'Create a new ad set within a campaign using the meta marketing api. supports detailed targeting options, budgets, and optimization goals.' },
                { name: 'Create campaign', description: 'Create a new campaign using the meta marketing api. campaigns group ad sets and define overall goals, budgets, and targeting.' }
            ]
        },
        'r3c1': { 
            name: 'Figma', 
            info: 'Figma is a vector graphics editor and user interface design tool.',
            hasOAuth: true,
            hasBearerToken: true,
            toolsCount: 49,
            triggersCount: 0,
            category: 'Design & Prototyping',
            tools: [
                { name: 'Add a comment to a file', description: "Posts a new comment to a figma file or branch, optionally replying to an existing root comment (replies cannot be nested); `region height` and `region width` in `client meta` must be positive if defining a comment region." },
                { name: 'Add a reaction to a comment', description: 'Posts a specified emoji reaction to an existing comment in a figma file or branch, requiring valid file key and comment id.' },
                { name: 'Create a webhook', description: "Creates a figma webhook for a `team id` to send post notifications for an `event type` to a publicly accessible https `endpoint`; an initial ping is sent unless `status` is `paused`." },
                { name: 'Create dev resources', description: 'Creates and attaches multiple uniquely-urled development resources to specified figma nodes, up to 10 per node.' }
            ]
        },
        'r3c2': { 
            name: 'Microsoft Teams', 
            info: 'Microsoft Teams is a messaging platform for teams, offering real-time communication, file sharing, and integration with other apps for productivity.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 28,
            triggersCount: 0,
            category: 'Communication & Collaboration',
            tools: [
                { name: 'Add member to team', description: 'Tool to add a user to a microsoft teams team. Use when granting or updating membership for a user' },
                { name: 'Archive Teams team', description: 'Tool to archive a microsoft teams team. use after confirming the team id; returns 202 if accepted.' },
                { name: 'Get all chats', description: 'Retrieves all microsoft teams chats a specified user is part of, supporting filtering, property selection, and pagination.' },
                { name: 'Get all chat messages', description: 'Retrieves all messages from a specified microsoft teams chat using the microsoft graph api, automatically handling pagination; ensure `chat id` is valid and odata expressions in `filter` or `select` are correct.' }
            ]
        },
        'r3c3': { 
            name: 'Google Super App', 
            info: 'Google Super App combines all Google services including Drive, Calendar, Gmail, Sheets, Analytics, Ads, and more, providing a unified platform for seamless integration and management of your digital life.',
            hasOAuth: true,
            hasBearerToken: true,
            hasApiKey: true,
            toolsCount: 223,
            triggersCount: 9,
            category: 'Document & File Management, Scheduling & Booking, Collaboration & Communication, Productivity & Project Management, Analytics & Data, Advertising & Marketing',
            tools: [
                { name: 'Add Enrichment', description: 'Adds enrichment at a specified position in a defined album' },
                { name: 'Add file sharing preference', description: "Modifies sharing permissions for an existing google drive file, granting a specified role to a user, group, domain, or 'anyone'." },
                { name: 'Modify email labels', description: "Adds and/or removes specified gmail labels for a message; ensure `message id` and all `label ids` are valid (use 'listlabels' for custom label ids)." },
                { name: 'Add or remove to customer list', description: 'Addorremovetocustomerlist tool will add a contact to a customer list in google ads. note: it takes 6 to 12 hours for changes to be reflected in the customer list.' }
            ]
        },
        'r3c4': { 
            name: 'Facebook', 
            info: 'Facebook is a social media and advertising platform used by individuals and businesses to connect, share content, and promote products or services.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 41,
            triggersCount: 0,
            category: 'Social Media',
            tools: [
                { name: 'Create post', description: 'Add a new post to Facebook' },
                { name: 'Update post', description: 'Update an existing post' },
                { name: 'Delete post', description: 'Delete a post' },
                { name: 'Create comment', description: 'Creates a comment on a facebook post' }
            ]
        },
        'r3c5': { 
            name: 'Gmail', 
            info: 'Gmail is Google’s email service, featuring spam protection, search functions, and seamless integration with other G Suite apps for productivity.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 23,
            triggersCount: 1,
            category: 'Collaboration & Communication',
            tools: [
                { name: 'Modify email labels', description: "Adds and/or removes specified gmail labels for a message; ensure `message id` and all `label ids` are valid (use 'listlabels' for custom label ids)." },
                { name: 'Create email draft', description: 'Creates a gmail email draft, supporting to/cc/bcc, subject, plain/html body (ensure `is html=true` for html), attachments, and threading.' },
                { name: 'Create label', description: "Creates a new label with a unique name in the specified user's gmail account." },
                { name: 'Delete Draft', description: "Creates a new label with a unique name in the specified user's gmail account." },
            ]
        },
        'r3c6': { 
            name: 'Slack', 
            info: 'Slack is a channel-based messaging platform. With Slack, people can work together more effectively, connect all their software tools and services, and find the information they need to do their best work — all within a secure, enterprise-grade environment.',
            hasOAuth: true,
            hasBearerToken: true,
            toolsCount: 133,
            triggersCount: 9,
            category: 'productivity,popular',
            tools: [
                { name: 'Set snooze duration', description: 'Deprecated: turns on do not disturb mode for the current user, or changes its duration. use `set dnd duration` instead.' },
                { name: 'Set do not disturb duration', description: 'turns on do not disturb mode for the current user for a specified duration' },
                { name: 'Add an emoji alias', description: 'Adds an alias for an existing custom emoji in a slack channel' },
                { name: 'Add a remote file', description: 'Adds a reference to an external file (e.g., google drive)' }
            ]
        },
        'r3c7': { 
            name: 'Google Docs', 
            info: 'Google Docs is a cloud-based word processor with real-time collaboration, version history, and integration with other Google Workspace apps.',
            hasOAuth: true,
            hasBearerToken: true,
            toolsCount: 32,
            triggersCount: 3,
            category: 'Productivity & Project Management, Document & File Managemen',
            tools: [
                { name: 'Create document', description: "Tool to create a copy of an existing google document. use this to duplicate a document, for example, when using an existing document as a template. the copied document will have a default title (e.g., 'copy of [original title]') if no new title is provided, and will be placed in the user's root google drive folder." },
                { name: 'Update document', description: 'Modify document details and status using the google docs api' },
                { name: 'Delete document', description: 'Delete a document using the google docs api' },
                { name: 'Get document', description: 'Retrieves an existing google document by its id; will error if the document is not found.' }
            ]
        },
        'r3c8': { 
            name: 'LinkedIn', 
            info: 'LinkedIn is a professional networking platform enabling job seekers, companies, and thought leaders to connect, share content, and discover business opportunities.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 4,
            triggersCount: 0,
            category: 'Social Media',
            tools: [
                { name: 'Create a LinkedIn post', description: 'Creates a new post on linkedin for the authenticated user or an organization they manage; ensure the user has necessary permissions if posting for an organization.' },
                { name: 'Update a LinkedIn post', description: 'Modify item properties and status using the linkedin api' },
                { name: 'Delete LinkedIn Post', description: 'Deletes a specific linkedin post (share) by its unique `share id`, which must correspond to an existing share.' },
                { name: 'Get company info', description: 'Retrieves organizations where the authenticated user has specific roles (acls), to determine their management or content posting capabilities for linkedin company pages.' }
            ]
        },
        'r3c9': { 
            name: 'Stripe', 
            info: 'Stripe offers online payment infrastructure, fraud prevention, and APIs enabling businesses to accept and manage payments globally',
            hasOAuth: true,
            hasBearerToken: false,
            hasApiKey: true,
            toolsCount: 33,
            triggersCount: 7,
            category: 'Finance & Accounting, E-commerce',
            tools: [
                { name: 'Cancel subscription', description: "Cancels a customer's active stripe subscription at the end of the current billing period, with options to invoice immediately for metered usage and prorate charges for unused time." },
                { name: 'Confirm payment intent', description: "Confirms a stripe paymentintent to finalize a payment; a `return url` is necessary if the payment method requires customer redirection." },
                { name: 'Create Customer', description: 'Confirms a stripe paymentintent to finalize a payment; a `return url` is necessary if the payment method requires customer redirection.' },
                { name: 'Create an invoice', description: 'Creates a new draft stripe invoice for a customer; use to revise an existing invoice, bill for a specific subscription (which must belong to the customer), or apply detailed customizations.' }
            ]
        }
        ,
        'r4c1': { 
            name: 'Microsoft Clarity', 
            info: 'Microsoft Clarity is a free user behavior analytics tool that captures heatmaps, session recordings, and engagement metrics to help improve website experiences.',
            hasOAuth: false,
            hasBearerToken: true,
            toolsCount: 1,
            triggersCount: 0,
            category: 'Analytics and Data',
            tools: [
                { name: 'Data Export', description: 'Export data from microsoft clarity.' },
            ]
        },
        'r4c2': { 
            name: 'Workday', 
            info: 'Workday is a cloud-based enterprise resource planning (ERP) software that provides comprehensive solutions for human capital management, financial management, and analytics.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 25,
            triggersCount: 0,
            category: 'HR & Payroll, Finance & Accounting',
            tools: [
                { name: 'Create Time off req', description: 'Creates a time off request for the specified worker id' },
                { name: 'Get absence balance', description: 'Retrieves the absence balance for the specified worker id' },
                { name: 'Get prospect', description: 'Retrieves a single prospect instance' },
                { name: 'Get absence request', description: 'Retrieves a single absence request instance' }
            ]
        },
        'r4c3': { 
            name: 'Hubspot', 
            info: 'HubSpot is an inbound marketing, sales, and customer service platform integrating CRM, email automation, and analytics to facilitate lead nurturing and seamless customer experiences.',
            hasOAuth: true,
            hasBearerToken: true,
            toolsCount: 245,
            triggersCount: 2,
            category: 'CRM & Sales',
            tools: [
                { name: 'Add asset association', description: 'Associates an existing asset with a specified hubspot... ' },
                { name: 'Add token to event template', description: 'Adds a new custom data token to an existing...' },
                { name: 'Archive email', description: 'Archives the hubspot email specified by `emailid` by moving...' },
                { name: 'Archive a batch of emails by ID', description: 'Archives multiple hubspot crm emails by id...' }
            ]
        },
        'r4c4': { 
            name: 'Webex', 
            info: 'Webex is a Cisco-powered video conferencing and collaboration platform offering online meetings, webinars, screen sharing, and team messaging.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 28,
            triggersCount: 0,
            category: 'Collaboration & Communication',
            tools: [
                { name: 'Create room', description: 'Create a new room' },
                { name: 'Create team', description: 'Create a new team' },
                { name: 'Create webhook', description: 'Create a new webhook' },
                { name: 'Get room details', description: 'Retrieve room details' }
            ]
        },
        'r4c5': { 
            name: 'Github', 
            info: 'Github is a web-based platform for version control and collaboration, offering features like issue tracking, pull requests, and code review.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 825,
            triggersCount: 6,
            category: 'Developer Tools & DevOps',
            tools: [
                { name: 'Accept a repository invitation', description: 'Accepts a pending repository invitation that has...' },
                { name: 'Add email for auth user', description: 'Adds one or more email addresses (which will be ...' },
                { name: 'Add labels to an issue', description: 'Adds labels (provided in the request body) to a ...' },
                { name: 'Add labels to a pull request', description: 'Adds labels (provided in the request body) to a pull...' }
            ]
        },
        'r4c6': { 
            name: 'Notion', 
            info: 'Notion centralizes notes, docs, wikis, and tasks in a unified workspace, letting teams build custom workflows for collaboration and knowledge management',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 28,
            triggersCount: 5,
            category: 'Productivity & Project Management',
            tools: [
                { name: 'Add multiple content...', description: 'Efficiently adds multiple standard content blocks to...' },
                { name: 'Add page', description: 'Add a new page to a notion database' },
                { name: 'Add property', description: 'Add a new property to a notion database' },
                { name: 'Delete page', description: 'Remove a page from the database' }
            ]
        },
        'r4c8': { 
            name: 'Google Sheets', 
            info: 'Google Sheets is a cloud-based spreadsheet tool enabling real-time collaboration, data analysis, and integration with other Google Workspace apps',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 36,
            triggersCount: 2,
            category: 'Productivity & Project Management',
            tools: [
                    { name: 'Add Sheet to...', description: 'Adds a new sheet (worksheet) to a spreadsheet. use...' },
                    { name: 'Aggregate Column...', description: 'Searches for rows where a specific column matches.' },
                    { name: 'Append Dimension', description: 'Tool to append new rows or columns to a sheet...' },
                    { name: 'Batch get spreadsheet', description: 'Retrieves data from specified cell ranges...' },
                ]
            },
        'r1c2': { 
            name: 'Gmail', 
            info: 'Gmail is a popular email service that provides a secure and reliable way to send and receive emails.',
            hasOAuth: true,
            hasBearerToken: true,
            toolsCount: 23,
            triggersCount: 1,
            category: 'Collaboration & Communication',
            tools: [
                { name: 'Send email', description: 'Send an email through Gmail' },
                { name: 'Update email', description: 'Modify email properties and status' },
                { name: 'Create draft', description: 'Set up a new draft email' },
                { name: 'Get updates', description: 'Retrieve email updates and comments' }
            ]
        },
        'r4c9': { 
            name: 'WhatsApp', 
            info: 'Enables interaction with customers through the WhatsApp Business API for messaging and automation.',
            hasOAuth: true,
            hasBearerToken: false,
            hasApiKey: true,
            toolsCount: 19,
            triggersCount: 0,
            category: 'messaging & Communication',
            tools: [
                { name: 'Send message', description: 'Send a message to a WhatsApp user' },
                { name: 'Update message', description: 'Modify message properties and status' },
                { name: 'Create draft', description: 'Set up a new draft message' },
                { name: 'Get updates', description: 'Retrieve message updates and comments' }
            ]
        }

        ,
        'r5c1': { 
            name: 'Salesforce', 
            info: 'Salesforce is a leading CRM platform integrating sales, service, marketing, and analytics to build customer relationships and drive business growth.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 97,
            triggersCount: 2,
            category: 'CRM, Sales & Customer Support',
            tools: [
                { name: 'Create Salesforce Ac...', description: 'Creates a new salesforce account using a json...' },
                { name: 'Add contact to camp...', description: 'Adds a contact to a campaign by creating a...' },
                { name: 'Add lead to camp...', description: 'Adds a lead to a campaign by creating a...' },
                { name: 'Add product to opp...', description: 'Adds a product (line item) to an opportunity...' }
            ]
        },
        'r5c2': { 
            name: 'Dropbox', 
            info: 'Dropbox is a cloud storage service offering file syncing, sharing, and collaboration across devices with version control and robust integrations',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 11,
            triggersCount: 2,
            category: 'Document & File Management',
            tools: [
                { name: 'Move file or folder', description: 'Move a file or folder to a new location' },
                { name: 'Read a file', description: 'Read a file from a specified path' },
                { name: 'Search File or Folder', description: 'Search for files or folders in dropbox' },
                { name: 'Upload File', description: 'Upload a file to a specified path' }
            ]
        },
        'r5c3': { 
            name: 'Microsoft Tenant', 
            info: 'Microsoft Tenant commonly refers to an instance of Microsoft 365 or Azure used by enterprises for cloud-based services, billing, and account management.',
            hasOAuth: false,
            hasBearerToken: false,
            toolsCount: 0,
            triggersCount: 0,
            category: 'Finance and Accounting',
            tools: [
                { name: 'No tools available' },
                
            ]
        },
        'r5c4': { 
            name: 'Calendly', 
            info: 'Calendly is an appointment scheduling tool that automates meeting invitations, availability checks, and reminders, helping individuals and teams avoid email back-and-forth.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 42,
            triggersCount: 0,
            category: 'Scheduling & Booking',
            tools: [
                { name: 'Cancel event', description: 'Permanently cancels an existing, active scheduled...' },
                { name: 'Create an invitee', description: 'Marks an invitee, identified by their existing...'},
                { name: 'Create One-Off Event', description: 'Creates a temporary calendly one-off event type...' },
                { name: 'Create scheduling link', description: 'Create a single-use scheduling link...' }
            ]
        },
        'r5c5': { 
            name: 'Google Slides', 
            info: 'Google Slides is a cloud-based presentation editor with real-time collaboration, template gallery, and integration with other Google Workspace apps.',
            hasOAuth: true,
            hasBearerToken: true,
            toolsCount: 6,
            triggersCount: 1,
            category: 'Document & File Management',
            tools: [
                { name: 'Create presentation', description: 'Create a new presentation' },
                { name: 'Update presentation', description: 'Update an existing presentation' },
                { name: 'Get presentation', description: 'Retrieve a presentation' },
                { name: 'Delete presentation', description: 'Delete an existing presentation' }
            ]
        },
        'r5c6': { 
            name: 'YouTube', 
            info: 'YouTube is a video-sharing platform with user-generated content, live streaming, and monetization opportunities, widely used for marketing, education, and entertainment.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 14,
            triggersCount: 4,
            category: 'Entertainment & Media',
            tools: [
                { name: 'Get Channel Activities', description: 'Gets recent activities from a youtube channel including video uploads...' },
                { name: 'Get channel ID by handle', description: 'Retrieves the youtube channel id for a specific youtube channel handle...' },
                { name: 'Get channel by ID', description: 'Retrieves the youtube channel for a specific youtube channel ID...' },
                { name: 'Get Channel Statistics', description: 'Gets detailed statistics for youtube channels including subscriber counts...' }
            ]
        },
        'r5c7': { 
            name: 'Google Photos', 
            info: 'Google Photos is a cloud-based photo storage and organization service offering automatic backups, AI-assisted search, and shared albums for personal and collaborative media management.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 13,
            triggersCount: 0,
            category: 'Document & File Management',
            tools: [
                { name: 'Add enrichment', description: 'Add a new enrichment to a photo' },
                { name: 'Batch Add Media It...', description: 'Add multiple media items to a Google Photos album' },
                { name: 'Batch Remove Med...', description: 'Remove multiple media items from a Google Photos...' },
                { name: 'Create Album', description: 'Creates a new album in google photos.' }
            ]
        },
        'r5c8': { 
            name: 'Discord', 
            info: 'Streamline work management with discord integration for project tracking.',
            hasOAuth: true,
            hasBearerToken: true,
            toolsCount: 6,
            triggersCount: 1,
            category: 'gaming,social,popular',
            tools: [
                { name: 'Get Invite', description: 'Tool to retrieve information about a specific invite code...' },
                { name: 'Get my guild member', description: 'Retrieves the guild member object for the authe...' },
                { name: 'Get my OAuth2 auth...', description: 'Retrieves current oauth2 authorization details for the...' },
                { name: 'Get my user', description: 'Fetches comprehensive profile information for the auth...' }
            ]
        },
        'r5c9': { 
            name: 'Google Meet', 
            info: 'Google Meet is a secure video conferencing platform that integrates with Google Workspace, facilitating remote meetings, screen sharing, and chat.',
            hasOAuth: true,
            hasBearerToken: false,
            toolsCount: 9,
            triggersCount: 0,
            category: 'collaboration & communication',
            tools: [
                { name: 'Create meeting', description: 'Add a new meeting to Google Meet' },
                { name: 'Get conference record', description: 'get a conference record' },
                { name: 'Get meeting details', description: 'get a meeting details' },
                { name: 'Time tracking', description: 'Track time on tasks' }
            ]
        }
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
        // Interaction lock: do nothing while panel is open or animations are running
        if (isInfoOpen || isAnimating) return;
        // Guard: ignore icons that don't have data
        if (!iconData[iconKey]) return;

        // Open info section for new icon
        openInfoSection(iconKey);
    };

    const updateIconPosition = (iconKey) => {
        const clickedIcon = document.querySelector(`[data-position="${iconKey}"] .connect-icon`);
        const iconPlaceholder = document.querySelector('.info-icon-placeholder');

        if (clickedIcon && iconPlaceholder) {
            const iconRect = clickedIcon.getBoundingClientRect();
            const placeholderRect = iconPlaceholder.getBoundingClientRect();

            // Calculate the center of both elements
            const iconCenterX = iconRect.left + iconRect.width / 2;
            const iconCenterY = iconRect.top + iconRect.height / 2;

            const placeholderCenterX = placeholderRect.left + placeholderRect.width / 2;
            const placeholderCenterY = placeholderRect.top + placeholderRect.height / 2;

            // Calculate the translation needed to move icon center to placeholder center
            const targetX = placeholderCenterX - iconCenterX;
            const targetY = placeholderCenterY - iconCenterY;

            // Compute dynamic scale so the icon fits into the placeholder
            const widthScale = placeholderRect.width / iconRect.width;
            const heightScale = placeholderRect.height / iconRect.height;
            const targetScale = Math.min(widthScale, heightScale);

            return { targetX, targetY, targetScale };
        }
        return { targetX: 0, targetY: 0, targetScale: 1 };
    };

    const openInfoSection = (iconKey) => {
        setIsAnimating(true);
        setSelectedIcon(iconKey);
        setAnimatingIcon(iconKey);
        setIsInfoOpen(true); // Show info section immediately

        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        // Clear any existing proximity glow
        const allItems = document.querySelectorAll('.connect-grid-item');
        allItems.forEach(item => item.classList.remove('proximity-glow'));

        const clickedIcon = document.querySelector(`[data-position="${iconKey}"] .connect-icon`);

        // Stage A: animate containers into place first
        requestAnimationFrame(() => {
            const tl = gsap.timeline({ ease: "power2.inOut" });
            timelineRef.current = tl;

            tl.to(innerRef.current, {
                x: "-50%",
                duration: 0.6,
                ease: "power2.inOut"
            }, 0)
            .fromTo(infoRef.current,
                { x: "100%", opacity: 0 },
                { x: "0%", opacity: 1, duration: 0.6, ease: "power2.inOut" },
                0
            )
            // Stage B: after containers settled, measure and move the icon
            .add(() => {
                if (!clickedIcon) {
                    setIsAnimating(false);
                    return;
                }
                const { targetX, targetY, targetScale } = updateIconPosition(iconKey);
                if (iconTweenRef.current) {
                    try { iconTweenRef.current.kill(); } catch (e) { /* noop */ }
                }
                iconTweenRef.current = gsap.to(clickedIcon, {
                    scale: targetScale,
                    x: targetX,
                    y: targetY,
                    transformOrigin: '50% 50%',
                    zIndex: 999,
                    duration: 0.6,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setIsAnimating(false);
                        // Mark that the icon has arrived at the panel and hide it to prevent re-fly during zoom
                        iconAtPanelRef.current = true;
                        gsap.set(clickedIcon, { autoAlpha: 0 });
                    }
                });
            });
        });
    };

    const closeInfoSection = (callback) => {
        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }
        // Also kill icon tween if running
        if (iconTweenRef.current) {
            try { iconTweenRef.current.kill(); } catch (e) { /* noop */ }
            iconTweenRef.current = null;
        }

        setIsAnimating(true);
        setIsInfoOpen(false);
        iconAtPanelRef.current = false;
        
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
                setIsAnimating(false);
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
            tl.set(selectedIconElement, { autoAlpha: 1 }, 0);
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

    // Handle window resize to keep the icon in place
    useEffect(() => {
        const handleResize = () => {
            // Reposition only while panel is open and the animated icon is hidden at the panel
            if (isInfoOpen && animatingIcon && iconAtPanelRef.current) {
                const { targetX, targetY, targetScale } = updateIconPosition(animatingIcon);
                const clickedIcon = document.querySelector(`[data-position="${animatingIcon}"] .connect-icon`);
                if (clickedIcon) {
                    gsap.set(clickedIcon, { x: targetX, y: targetY, scale: targetScale, transformOrigin: '50% 50%' });
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isInfoOpen, animatingIcon]);

    // Focus management: move focus to close button when panel opens
    useEffect(() => {
        if (isInfoOpen && closeBtnRef.current) {
            try { closeBtnRef.current.focus(); } catch (e) { /* noop */ }
        }
    }, [isInfoOpen]);

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
        <div id="applications-section" className="connect-anything-container" ref={containerRef}>
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
                    <div className={`connect-anything-grid ${isInfoOpen || isAnimating ? 'grid-locked' : ''}`}>
                        {generateGridItems()}
                    </div>
                </div>
            </div>

            {/* Info Section - positioned outside for fixed positioning */}
            <div className="info-section" ref={infoRef}>
                {/* Close button positioned on left border */}
                {isInfoOpen && (
                    <motion.button 
                        ref={closeBtnRef}
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
                            {/* Header section with icon and title */}
                            <div className="info-header">
                                <div className="info-icon-placeholder">
                                    {/* Always show a static icon as a fallback for perfect alignment */}
                                    <img
                                        src={`/${selectedIcon}.svg`}
                                        alt={`${iconData[selectedIcon].name} icon`}
                                        className="info-icon-large"
                                        loading="eager"
                                    />
                                </div>
                                <div className="info-header-text">
                                    <h3 className="info-title">{iconData[selectedIcon].name}</h3>
                                    <p className="info-description">{iconData[selectedIcon].info}</p>
                                </div>
                            </div>

                            {/* Auth badges */}
                            <div className="info-badges">
                                {iconData[selectedIcon].hasOAuth && (
                                    <span className="info-badge oauth">OAUTH2</span>
                                )}
                                {iconData[selectedIcon].hasBearerToken && (
                                    <span className="info-badge bearer">BEARER_TOKEN</span>
                                )}
                                {iconData[selectedIcon].hasApiKey && (
                                    <span className="info-badge api-key">API_KEY</span>
                                )}
                                <span className="info-stat tools-stat">
                                    <img src="/wrench.svg" alt="tools" className="badge-icon" />
                                    {iconData[selectedIcon].toolsCount} Tools
                                </span>
                                <span className="info-stat triggers-stat">
                                    <img src="/flash.svg" alt="triggers" className="badge-icon" />
                                    {iconData[selectedIcon].triggersCount} Triggers
                                </span>
                            </div>

                            {/* Category */}
                            <div className="info-category">
                                <span className="category-label">Categories: {iconData[selectedIcon].category}</span>
                            </div>

                            {/* Tools section */}
                            <div className="info-tools-section">
                                <h4 className="tools-title">Tools</h4>
                                <div className="tools-list">
                                    {iconData[selectedIcon].tools.map((tool, index) => (
                                        <div key={index} className="tool-item">
                                            <div className="tool-name">{tool.name}</div>
                                            <div className="tool-description">{tool.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ConnectAnything;
