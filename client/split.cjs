const fs = require('fs');

const css = fs.readFileSync('src/index.css', 'utf8');

function extractSection(name, startMarker, endMarker) {
    const startIndex = css.indexOf(startMarker);
    const endIndex = endMarker ? css.indexOf(endMarker) : css.length;
    if (startIndex === -1) return '';
    return css.substring(startIndex, endIndex);
}

// Map components to their comment markers in index.css
const sections = {
    'Loader': '/* ─── Loader ',
    'Navbar': '/* ─── Navbar ',
    'Hero': '/* ─── Hero ',
    'StatsBar': '/* ─── Stats Bar ',
    'FeaturedPlots': '/* ─── Featured Plots ',
    'WhyUs': '/* ─── Why Us ',
    'About': '/* ─── About ',
    'Testimonials': '/* ─── Testimonials ',
    'Footer': '/* ─── Footer ',
    'PreviousPlots': '/* ─── Previous Plots Section ',
    'GlobalIcons': '/* ─── Global Icon Polish '
};

// Note Enquiry Form has two sections
const enquiry1 = extractSection('Enquiry Form', '/* ─── Enquiry Form ', '/* ─── Footer ');
const enquiry2 = extractSection('Enquiry Redesign', '/* ─── Enquiry Section Redesign ', '/* ─── Scroll to Top '); // The second scroll to top
let enquiryCss = enquiry1 + '\n\n' + enquiry2;

// The rest are standard sections
// We need to figure out their exact end points.
const markers = [
    '/* ─── Loader ',
    '/* ─── Navbar ',
    '/* ─── Hero ',
    '/* ─── Stats Bar ',
    '/* ─── Featured Plots ',
    '/* ─── Why Us ',
    '/* ─── About ',
    '/* ─── Testimonials ',
    '/* ─── Enquiry Form ',
    '/* ─── Footer ',
    '/* ─── Scroll to Top ',
    '/* ─── Enquiry Section Redesign ',
    '/* ─── Scroll to Top ',
    '/* ─── Global Icon Polish ',
    '/* ─── Responsive ',
    '/* ─── Previous Plots Section '
];

const parsed = [];
for (let i = 0; i < markers.length; i++) {
    const start = css.indexOf(markers[i]);
    const end = i < markers.length - 1 ? css.indexOf(markers[i + 1], start + 10) : css.length;
    parsed.push({ marker: markers[i], content: css.substring(start, end) });
}

const componentCss = {};
// Component mapping
componentCss['Loader'] = parsed.find(p => p.marker.includes('Loader')).content;
componentCss['Navbar'] = parsed.find(p => p.marker.includes('Navbar')).content;
componentCss['Hero'] = parsed.find(p => p.marker.includes('Hero')).content;
componentCss['StatsBar'] = parsed.find(p => p.marker.includes('Stats Bar')).content;
componentCss['FeaturedPlots'] = parsed.find(p => p.marker.includes('Featured Plots')).content;
componentCss['WhyUs'] = parsed.find(p => p.marker.includes('Why Us')).content;
componentCss['About'] = parsed.find(p => p.marker.includes('About')).content;
componentCss['Testimonials'] = parsed.find(p => p.marker.includes('Testimonials')).content;
componentCss['Footer'] = parsed.find(p => p.marker.includes('Footer')).content;
componentCss['PreviousPlots'] = parsed.find(p => p.marker.includes('Previous Plots Section')).content;

const enquiryPart1 = parsed.find(p => p.marker.includes('Enquiry Form')).content;
const enquiryPart2 = parsed.find(p => p.marker.includes('Enquiry Section Redesign')).content;
componentCss['EnquiryForm'] = enquiryPart1 + enquiryPart2;

// Keep the base CSS
const baseCssIndex = css.indexOf('/* ─── Loader ');
let newIndexCss = css.substring(0, baseCssIndex);
newIndexCss += parsed.find(p => p.marker === '/* ─── Scroll to Top ').content;
newIndexCss += parsed.find(p => p.marker === '/* ─── Global Icon Polish ').content;
const responsiveBlock = parsed.find(p => p.marker.includes('Responsive')).content;
newIndexCss += '\n\n/* Ensure responsive goes after all */\n' + responsiveBlock; // Wait, actually I shouldn't leave responsive at the end of index if components are loaded later!

// Better yet, let's inject exports or just keep all responsive rules in index.css but make sure it is imported LAST.
// If index.css is imported in main.jsx, and components import their own CSS, component CSS is added AFTER index.css.
// This means component base styles will override index.css responsive styles!
// To fix this, I should extract the media queries per component and append them to the component CSS.

// Let's implement a rudimentary media query extractor based on known classes
const mq1200 = css.substring(css.indexOf('@media (max-width: 1200px) {'), css.indexOf('@media (max-width: 1024px) {'));
const mq1024 = css.substring(css.indexOf('@media (max-width: 1024px) {'), css.indexOf('@media (max-width: 768px) {'));
const mq768 = css.substring(css.indexOf('@media (max-width: 768px) {'), css.indexOf('@media (max-width: 480px) {'));
const mq480 = css.substring(css.indexOf('@media (max-width: 480px) {'), css.indexOf('/* ─── Previous Plots Section '));

function extractComponentMq(componentName, classes) {
    let result = '';
    const mqs = [
        { rules: mq1200, mq: '@media (max-width: 1200px)' },
        { rules: mq1024, mq: '@media (max-width: 1024px)' },
        { rules: mq768, mq: '@media (max-width: 768px)' },
        { rules: mq480, mq: '@media (max-width: 480px)' }
    ];

    for (let m of mqs) {
        let blockRules = '';
        // rudimentary extraction of rules starting with the class names
        for (let cls of classes) {
            const regex = new RegExp('(\\' + cls + '\\s*[{,][^}]*})', 'g');
            let match;
            while ((match = regex.exec(m.rules)) !== null) {
                blockRules += '\n  ' + match[1];
            }
        }
        if (blockRules) {
            result += '\n' + m.mq + ' {' + blockRules + '\n}\n';
        }
    }
    return result;
}

// Classes for each component:
componentCss['Hero'] += extractComponentMq('Hero', ['.hero-layout', '.hero-video-wrap', '.hero-float-tag-1', '.hero-float-tag-2', '.hero-stats', '.hero-buttons']);
componentCss['StatsBar'] += extractComponentMq('StatsBar', ['.statsbar ', '.statsbar']);
componentCss['FeaturedPlots'] += extractComponentMq('FeaturedPlots', ['.plots-grid']);
componentCss['WhyUs'] += extractComponentMq('WhyUs', ['.whyus-grid', '.whyus-cards', '.whyus-image', '.whyus-badge']);
componentCss['About'] += extractComponentMq('About', ['.about-grid', '.about-image-wrap', '.about-img-overlay', '.about']);
componentCss['Footer'] += extractComponentMq('Footer', ['.footer-grid', '.footer-bottom']);
componentCss['EnquiryForm'] += extractComponentMq('EnquiryForm', ['.contact-cards-row', '.enquiry-grid', '.enquiry-info-panel', '.form-row', '.enquiry-form', '.eip-inner']);
componentCss['Navbar'] += extractComponentMq('Navbar', ['.nav-links', '.hamburger']);

for (let comp in componentCss) {
    fs.writeFileSync(`src/components/${comp}.css`, componentCss[comp]);
}

let finalIndexCss = css.substring(0, baseCssIndex);
const scrollTops = parsed.filter(p => p.marker.includes('Scroll to Top '));
if (scrollTops.length > 0) finalIndexCss += scrollTops[0].content;
finalIndexCss += parsed.find(p => p.marker.includes('Global Icon Polish')).content;

fs.writeFileSync('src/index.css', finalIndexCss);
console.log('done!');
