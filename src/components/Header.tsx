
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="py-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-block mb-1 text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
            API Testing Interface
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">
            Modern API Tester
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            A sleek, minimalist interface for testing API endpoints with elegant transitions and animations.
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
