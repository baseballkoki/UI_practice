import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { ProgressBar }  from "../organisms/layout/ProgressBar"
import './Home.css';
import nyanko3 from "../../image/nyanko3.png"
import { cat } from '../types/api/cat';
import AdmaxAd from '../organisms/AdmaxAd';

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
    
    const formData = new FormData();
    formData.append("imageFile", file ? file : "default.jpg");

    setIsLoading(true);
    
    const response = await fetch("https://api-practice-spring.onrender.com/services/v1/nyanko/predict", {
    //const response = await fetch("http://localhost:4646/services/v1/nyanko/predict", {
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
  const testResponse = await fetch(`https://api-practice-spring.onrender.com/services/v1/nyanko/type?${numbersQueryParam}`, {
  //const testResponse = await fetch(`http://localhost:4646/services/v1/nyanko/type?${numbersQueryParam}`, {
    method: "GET",  // GETメソッドに変更
  });

  const catData: cat = await testResponse.json();


  setCatData(catData);
  setResult(dataFromResponse);
  setIsLoading(false);
  setShowPreview(true);
  };


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

    // 広告スクリプトのロード
    const scriptId = 'ad-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://adm.shinobi.jp/s/78747c8b235603c5f3bc4ca0b3b76667';
      script.async = true;
      document.body.appendChild(script);
    }

    // 既存の useEffect ロジックに関連するクリーンアップ関数がある場合はここに追加
    return () => {
      // 既存のクリーンアップロジックがあればここに
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [catData]);


  return (
    <div className="home-container">
       <div className="upload-section">
        {!showPreview ? (
          <>
          <script src="https://adm.shinobi.jp/s/78747c8b235603c5f3bc4ca0b3b76667"></script>
            <input type="file" onChange={onFileChange} />
            <button className="upload-btn" onClick={uploadFile} disabled={isLoading}>
              解析を開始する
            </button>
            {isLoading && <p>処理中...10秒ほどかかることがあります</p>} 
          </>
        ) : (
          <img src={preview?.toString()} alt="Preview" className="preview-image" />
        )}
      </div>

      {result ? (
        <>
  <div className="results-section">
  <AdmaxAd />
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
  <div className="cat-analysis-section">
      <div className="cat-analysis-box">
      <div className="icon-container">
        <img src={`/image/icon_ai.jpg`} alt="Icon" className="cat-analysis-icon" />
          <div className="icon-text">
          AIが画像から猫の顔の造形を精密に解析し性格を診断します。
        </div>
      </div>
      </div>
      <div className="cat-analysis-box">
      <div className="icon-container">
        <img src={`/image/icon_camera.jpg`} alt="Icon" className="cat-analysis-icon" />
        <div className="icon-text">
          猫の顔が大きく映っている画像を選択してください
        </div>
      </div>
      </div>
  </div>
)}
    </div>
  );
};



