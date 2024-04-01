export async function query(data) {
	const apiEndpoints = [
		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",     
		"https://api-inference.huggingface.co/models/dataautogpt3/OpenDalleV1.1",   
		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
		"https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
		"https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
	  


	  // Adicione outros endpoints aqui, se necessário
	];
  
	for (const endpoint of apiEndpoints) {
	  try {
		const response = await fetch(endpoint, {
		  headers: {
			Accept: "image/png",
			Authorization: "Bearer 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",
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