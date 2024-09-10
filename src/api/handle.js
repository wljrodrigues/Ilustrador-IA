export async function query(data) {
	const apiEndpoints = [
	"https://api-inference.huggingface.co/models/fluently/Fluently-XL-v2",
    "https://api-inference.huggingface.co/models/ehristoforu/dalle-3-xl-v2",
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",     
    "https://api-inference.huggingface.co/models/dataautogpt3/OpenDalleV1.1",   
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",	  
     // Adicione outros endpoints aqui, se necessário
	];

	 // Parâmetros de configuração
	 const cfgScale = "8-7"; // CFG Scale: Use a CFG scale of 8 to 7
	 const steps = "60-70"; // Steps: 60 to 70 steps for more detail, 35 steps for faster results.
	 const sampler = "DPM2"; // Sampler: DPM2
	 const scheduler = "Normal"; // Scheduler: Normal or Karras
  
	for (const endpoint of apiEndpoints) {
	  try {
		const response = await fetch(endpoint, {
		  headers: {
			Accept: "image/png",
			Authorization: "SUA_API_KEY",
			"Content-Type": "application/json",
		  },
		  method: "POST",
		  body: JSON.stringify({ ...data, model: apiEndpoints.indexOf(endpoint) }), // Adiciona o índice do modelo
		});
  
		if (response.ok) {
		  const result = await response.blob();
  
		  setTimeout(() => {
			alert("Parabéns!🎉🎉 Sua Ilustração Foi Gerada Com Sucesso! 💚💚");
		  }, 500);
  
		  return result;
		}
	  } catch (error) {
		console.error("Erro:", error.message);
	  }
	}
  
	throw new Error("Serviço indisponível. Tente novamente mais tarde.");
  }
