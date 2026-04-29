/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProcessSelector } from '../components/ProcessSelector';
import { RequestForm } from '../components/RequestForm';
import { ProcessType } from '../types';
import { AnimatePresence, motion } from 'motion/react';

export const NewRequest = () => {
  const [selectedType, setSelectedType] = useState<ProcessType | null>(null);
  const navigate = useNavigate();

  const handleSelect = (type: ProcessType) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    if (selectedType) setSelectedType(null);
    else navigate('/');
  };

  const handleSubmit = (data: any) => {
    console.log('Submitting draft:', data);
    // In a real app, this would hit an API
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AnimatePresence mode="wait">
        {!selectedType ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProcessSelector onSelect={handleSelect} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <RequestForm 
              type={selectedType} 
              onBack={handleBack} 
              onSubmit={handleSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
