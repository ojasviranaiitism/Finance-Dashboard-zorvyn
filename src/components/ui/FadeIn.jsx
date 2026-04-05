import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            // Initial state: invisible and pushed down 30px
            initial={{ opacity: 0, y: 30 }}

            // Animate to fully visible and original position when scrolled into view
            whileInView={{ opacity: 1, y: 0 }}

            // Ensure animation plays only once and triggers slightly before fully entering viewport
            viewport={{ once: true, margin: "-40px" }}

            // Smooth transition with custom easing and optional delay
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}

            // Optional additional styling classes
            className={className}
        >
            {/* Render child elements */}
            {children}
        </motion.div>
    );
};

export default FadeIn;