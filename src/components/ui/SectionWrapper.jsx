import { motion } from "framer-motion";

const SectionWrapper = ({ children, id, className }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8 }}
      className={`py-20 px-4 sm:px-8 max-w-7xl mx-auto relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;