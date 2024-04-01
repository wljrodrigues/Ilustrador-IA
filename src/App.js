import './App.css';
import './components/Pagination.css'
import './components/PaginationItem.css'  
import { useEffect, useState } from "react";
import Pagination from './components/Pagination'
import { query } from './api/handle';
import { saveAs } from 'file-saver';

function App() {
  const [inputText, setInputText] = useState('');
  const [imageArray, setImageArray] = useState(Array.from({ length: 10 }));
  const [submitBtn, setSubmitBtn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTextEnabled, setIsTextEnabled] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bubbleArray, setBubbleArray] = useState(Array.from({ length: 10 }));
  const [showScrollButton, setShowScrollButton] = useState(false);
  const filteredImages = imageArray.filter((image) => image !== undefined);
  const [selectedStyle, setSelectedStyle] = useState(null);


  const handleStyleChange = (selectedOption) => {
    setSelectedStyle(selectedOption);
  };

  const handleImageClick = (imageSrc, index) => {
    const fileName = `EditoraItacaiunas_${index + 1}`;
    saveAs(imageSrc, fileName);
  };

   const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleQuery = async () => {
    setIsLoading(true);

    try {
      if (inputText === '') {
        alert('Por favor, descreva o que deseja. ');
        return;
      }

      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = undefined;
        return newImages;
      });

      // Adicionando o modelo selecionado ao parâmetro de consulta
      const response = await query({ "inputs": inputText });
      const imageUrl = URL.createObjectURL(response);

      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = imageUrl;
        return newImages;
      });

      setInputText('');
    } catch (error) {
      console.log('A geração de imagem falhou:', error);
    } finally {
      setIsLoading(false);
    }
  };
      
  return (
    <>
        <div className='lg:mx-5 min-h-screen flex flex-col items-center justify-center py-3 mx-auto'>
        
          {/* for Pagination */}
       <div className='container' >
            <Pagination
              currentPage={currentPage}
              total={10}
              limit={1}
              onPageChange={(page) => setCurrentPage(page)}
              imageArray={imageArray}
              isLoading = {isLoading}
              bubbleArray={bubbleArray}              
            />
        </div>

         {/* Modern Design Search Input  */}
         <div className="relative basis-12/12 lg:basis-3/3 xl:basis-12/12 flex flex-col ">
          
         <textarea
          required={true}
          value={inputText}
          placeholder='DESCREVA SUA IMAGEM E ESCOLHA UM MODELO '
          className="block w-12/12 h-[5em] p-2 text-xs text-gray-900 border-2 
          outline-none border-green-800 rounded-lg bg-white focus:ring-blue-500 
          focus:border-blue-500 dark:bg-gray-50 dark:border-gray-200 
          dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 
          dark:focus:border-blue-500"
          onChange={(e) => setInputText(e.target.value)}
        />
                 
    
        
          {/* Prompt Button Group  */}
            <div className='flex justify-around mt-2'>
                <button onClick={handleQuery}
                  className='text-white w-32 bg-blue-700 hover:bg-blue-800 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                  px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >CRIAR  
                </button>

             {/*
                <button onClick={() => setSubmitBtn(!submitBtn)}
                  className="text-white w-32 bg-blue-700 hover:bg-blue-800 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                  px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {
                      submitBtn ? 'Ocultar' : 'Ver Resultados'
                    }
                  </button> */}
            </div>
<br/>


            {/*<p><b>Exemplo de prompt no estilo desenho para colorir:</b></p> */  }

                    {/* Comic text addition  */}
            <div className='mt-3 p-2 '>
              <label className="flex items-center space-x-2">
       
             {/* <div ><i><p>A cute jaguar, disney pixar style, white background, coloring line art, drawings for kids, cool coloring pages, coloring book art, coloring book page style vector lines, 8k</p></i><br/></div>*/}

              {/*  <input
                  type="checkbox"
                  checked={isTextEnabled}
                  onChange={() => setIsTextEnabled(!isTextEnabled)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />*/}
                <span className="text-gray-100"></span>
                </label> 

             {/* <textarea
                value={textValue}
                placeholder='Digite o texto que vai aparecer na imagem ... '
                onChange={(e) => setTextValue(e.target.value)}
                className={`mt-2 block w-full h-[10rem] p-1 text-sm text-gray-900 border-2 
                  outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500 ${!isTextEnabled && 'opacity-50 cursor-not-allowed'}`}
                disabled={!isTextEnabled}
                />*/}
              
             {/* <button
                className='mt-3 text-white w-32 bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={handleText}
              >Inserir Texto
              </button> */}
            </div>

            {/*
<div>
<p>👷🏼‍♂️🔧 Qualquer problema técnico que o Ilustrador tiver enfrentado, por favor, envie-me um e-mail para wljrodrigues@gmail.com</p>
<br/><br/>
</div>
            */}
            
            <div  className="text-gray-100" >
              
        <p>Esta é uma aplicação oferecida pela Itacaiúnas. <b></b>
        </p>
      </div>
        
            
          </div>

        </div >

        {/* preview comic section  */}
        <div className={`mx-auto flex flex-col justify-center items-center ${submitBtn ? 'my-40' : ''}`}>
            
              <>
                <div className="relative">
                  {filteredImages.map((imageSrc, index) => (
                        <div key={index} className="relative">
                        <img
                          src={imageSrc}
                          alt={`Fetched ${index + 1}`}
                          className='block border-[0.1rem] rounded my-2 max-h-[50rem] max-w-[50rem] md:w-[100%] md:h-[100%]'
                          onClick={() => handleImageClick(imageSrc, index)}
                          style={{ cursor: 'pointer' }}
                  />                       
                        {bubbleArray[index] && (
                          <div key={index} className="speech top-right">
                            {bubbleArray[index]}
                          </div>
                        )}
                      </div>
                  ))}
                </div>
              </>
               
            
        </div>

        {/* scroll to top button */}
        {showScrollButton && (
        <button className="scroll-to-top" onClick={handleScrollToTop}>
          &#9650;
        </button>
      )}
    </>

  );
}
export default App;
