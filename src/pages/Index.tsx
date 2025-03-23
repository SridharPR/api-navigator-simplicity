
import { motion } from "framer-motion";
import Header from "@/components/Header";
import ApiTester from "@/components/ApiTester";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <motion.div
        className="min-h-screen py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Header />
        <ApiTester />
      </motion.div>
    </div>
  );
};

export default Index;
