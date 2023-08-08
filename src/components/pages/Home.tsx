import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { ProgressBar }  from "../organisms/layout/ProgressBar"
import './Home.css';
import nyanko3 from "../../image/nyanko3.png"

export const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  

  const uploadFile = async () => {
    if (!file) {
        alert("画像を選択してださい");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", file ? file : "default.jpg");

    setIsLoading(true);
    
    const response = await fetch("http://localhost:4646/services/v1/nyanko/predict", {
      method: "POST",
      body: formData,
    });

    // const response = await fetch("http://localhost:4646/services/v1/nyanko/test", {
    //    method: "POST",
    //  });

    //  const responseBody = await response.text();
    // alert(responseBody);


    const dataFromResponse = await response.json();  // レスポンスをJSONとして解析

  if (Array.isArray(dataFromResponse)) {  // 解析したデータが配列であるか確認
    for (const number of dataFromResponse) {
      alert(number);  // 配列の中の各整数をalertで出力
    }
  } else {
    alert("データが配列ではありません。");
  }

    // const data = await response.json();

    const data = {
        cuteness: 80,
        smartness: 70,
        strength: 80,
        cooperation: 80,
        affectionTowardsOwner: 70,
        oldnessOfFace: 90
      };


    setResult(data);
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
  <div className="results-section">
    <ProgressBar title="賢さ" value={result.cuteness} max={100} />
    <ProgressBar title="血の気の多さ" value={result.smartness} max={100} />
    <ProgressBar title="社交性(対猫)" value={result.strength} max={100} />
    <ProgressBar title="美形度" value={result.cooperation} max={100} />
    <ProgressBar title="優しさ" value={result.affectionTowardsOwner} max={100} />
    <ProgressBar title="甘えん坊" value={result.oldnessOfFace} max={100} />
    <ProgressBar title="面倒見の良さ" value={result.oldnessOfFace} max={100} />
    <ProgressBar title="寂しがり度" value={result.oldnessOfFace} max={100} />
  </div>
) : (
  <div style={{textAlign: "center"}}>AIが画像から猫の顔の造形を精密に解析し、猫の性格を診断します。<br></br>
    あなたの家の猫ちゃんの独特な性格や今まで見えなかった一面が明らかになるかもしれません。</div>
)}
    </div>
  );
};

