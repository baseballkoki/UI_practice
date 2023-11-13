import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { ProgressBar }  from "../organisms/layout/ProgressBar"
import './Home.css';
import nyanko3 from "../../image/nyanko3.png"
import { cat } from '../types/api/cat';

export const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [catData, setCatData] = useState<cat | null>(null);
  const [showCatData, setShowCatData] = useState(false);
  const fade = useSpring({
    opacity: showCatData ? 1 : 0,
    config: { tension: 30, friction: 20 }
  });


  const uploadFile = async () => {
    if (!file) {
        alert("画像を選択してださい");
      return;
    }

    // let processedFile = file; // let変数に変更して再代入可能にする

    // if (file.size > 400000) {
    //   // Resize the image to 1300x1300 pixels
    //   const blob = await resizeImage(file); // resizeImageがBlobを返すようにする
    //   processedFile = new File([blob], file.name, { type: file.type }); // 新しいFileオブジェクトを作成
    // }
    
    const formData = new FormData();
    formData.append("imageFile", file ? file : "default.jpg");

    setIsLoading(true);
    
    //const response = await fetch("https://api-practice-spring.onrender.com/services/v1/nyanko/predict", {
    const response = await fetch("http://localhost:4646/services/v1/nyanko/predict", {
      method: "POST",
      body: formData,
    });

    const dataFromResponse = await response.json();  // レスポンスをJSONとして解析

  if (Array.isArray(dataFromResponse)) {  // 解析したデータが配列であるか確認
    for (const number of dataFromResponse) {
    }
  } else {
    alert("データが配列ではありません。");
  }

  // numbersをクエリパラメータとして組み立て
  const numbersQueryParam = dataFromResponse.map((num: number) => `numbers=${num}`).join('&');

  // 続いてdataFromResponseを用いて2つ目のAPIを呼び出す
  //const testResponse = await fetch(`https://api-practice-spring.onrender.com/services/v1/nyanko/type?${numbersQueryParam}`, {
  const testResponse = await fetch(`http://localhost:4646/services/v1/nyanko/type?${numbersQueryParam}`, {
    method: "GET",  // GETメソッドに変更
  });

  const catData: cat = await testResponse.json();


  setCatData(catData);
  setResult(dataFromResponse);
  setIsLoading(false);
  setShowPreview(true);
  };


  // const resizeImage = (file: File): Promise<Blob> => new Promise((resolve, reject) => {
  //   // Create an image object
  //   const img = new Image();
  
  //   // Create a file reader
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  
  //   reader.onload = (event: ProgressEvent<FileReader>) => {
  //     const result = event.target?.result; // event.targetがnullでないことを確認
  //     if (typeof result === 'string') { // resultがstring型であることを確認
  //       img.src = result;
  //     } else {
  //       reject(new Error('FileReaderの結果がstring型ではありません。'));
  //     }
  //   };
  
  //   img.onload = () => {
  //     // Create a canvas
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');
  //     if (!ctx) {
  //       reject(new Error('2Dコンテキストを取得できませんでした。'));
  //       return;
  //     }
  
  //     // Calculate the resize width and height
  //     const scaleFactor = Math.sqrt(400000 / file.size); // 縮小率を計算
  //     canvas.width = img.width * scaleFactor; // オリジナルのアスペクト比を維持する
  //     canvas.height = img.height * scaleFactor; // オリジナルのアスペクト比を維持する
  
  //     // Draw the image on the canvas
  //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  //     // Convert the canvas to a blob
  //     canvas.toBlob((blob) => {
  //       if (blob) {
  //         resolve(blob);
  //       } else {
  //         reject(new Error('Canvas to Blob変換に失敗しました'));
  //       }
  //     }, file.type);
  //   };
  
  //   reader.onerror = (error: ProgressEvent<FileReader>) => {
  //     reject(error);
  //   };
  // });




  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (catData) {
      setTimeout(() => {
        setShowCatData(true);
      }, 3000);
    }
  }, [catData]);


  return (
    <div className="home-container">
       <div className="upload-section">
        {!showPreview ? (
          <>
            <input type="file" onChange={onFileChange} />
            <button className="upload-btn" onClick={uploadFile} disabled={isLoading}>
              解析を開始する
            </button>
          </>
        ) : (
          <img src={preview?.toString()} alt="Preview" className="preview-image" />
        )}
      </div>

      {result ? (
        <>
  <div className="results-section">
    <ProgressBar title="賢さ" value={result[0]} max={100} />
    <ProgressBar title="血の気の多さ" value={result[1]} max={100} />
    <ProgressBar title="社交性" value={result[2]} max={100} />
    <ProgressBar title="美形度" value={result[3]} max={100} />
    <ProgressBar title="優しさ" value={result[4]} max={100} />
    <ProgressBar title="甘えん坊" value={result[5]} max={100} />
    <ProgressBar title="面倒見の良さ" value={result[6]} max={100} />
    <ProgressBar title="寂しがり度" value={result[7]} max={100} />
  </div>
  {catData && (
            <animated.div style={fade} className="results-section">
               <h2 className="centered-and-large">{catData.type}</h2> {/* クラス名を追加 */}
               <h2>{catData.text}</h2>
            </animated.div>
          )}
  </>
) : (
  <div style={{textAlign: "center"}}>AIが画像から猫の顔の造形を精密に解析し、猫の性格を診断します。<br></br>
    あなたの家の猫ちゃんの独特な性格や今まで見えなかった一面が明らかになるかもしれません。</div>
)}
    </div>
  );
};



