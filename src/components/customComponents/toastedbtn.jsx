import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Toast = () => {
  const [showToast, setShowToast] = useState(true);

  // Animation Variants for Framer Motion
  const toastVariants = {
    hidden: { x: "100%", opacity: 0 }, // يبدأ من خارج الشاشة على اليمين
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
    exit: { x: "100%", opacity: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          className="toast position-fixed end-0 top-20 m-4 show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            zIndex: 1050, // لضمان ظهوره فوق الفوتر
            top: "80px", // تعديل الموضع لجعله فوق الفوتر
            right: "20px", // يظل في الجانب الأيمن
          }}
        >
          <div className="toast-header">
            <strong className="me-auto">Congratulations</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            The medicine has been added successfully!
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
