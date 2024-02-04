import React, { createContext, useState } from 'react';
import axios from 'axios';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [selectedImg, setSelectedImg] = useState('dalle');
  const [prompt, setPrompt] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const [formSwitcher, setFormSwitcher] = useState(true);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const token = process.env.NEXT_PUBLIC_SD_API_KEY;
    const modelId = 'stable-diffusion-xl-beta-v2-2-2';
    const apiHost = 'https://stablediffusionapi.com';

    try {
      const response = await axios.post(
        `${apiHost}/api/v3/text2img`,
        {
          key: "ZF69YGI53RnbzHfoFeJP4z6bsAt8JUopSPUZOgOh9G20BWCIixDgAmH2CGHE",
          prompt: prompt,
          negative_prompt: null,
          width: "512",
          height: "512",
          samples: "1",
          num_inference_steps: "20",
          seed: null,
          guidance_scale: 7.5,
          safety_checker: "yes",
          multi_lingual: "no",
          panorama: "no",
          self_attention: "no",
          upscale: "no",
          embeddings_model: null,
          webhook: null,
          track_id: null
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.output && response.data.output.length > 0) {
        setBase64Image(response.data.output[0]);
        console.log("response data:", response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }

      setIsGenerating(false);
      setGenerationComplete(true);
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const handleOpenModal = () => {
    if (isGenerating) {
      setOpenModal(true);
    }
  };

  const handleClick = (name) => {
    setSelectedImg(name);
  };

  const handleMultistep = (e) => {
    e.preventDefault();
    setFormSwitcher(true);
  };

  const contextValues = {
    formSwitcher,
    handleMultistep,
    selectedImg,
    setSelectedImg,
    prompt,
    setPrompt,
    openModal,
    setOpenModal,
    isGenerating,
    setIsGenerating,
    generationComplete,
    setGenerationComplete,
    base64Image,
    setBase64Image,
    handleChange,
    handleSubmit,
    handleOpenModal,
    handleClick,
  };

  return (
    <FormContext.Provider value={contextValues}>
      {children}
    </FormContext.Provider>
  );
};
