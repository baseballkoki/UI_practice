import React, { memo } from "react";
import './Setting.css'; // CSSファイルをインポート

export const Setting = memo(() => {
    const appDescription = "猫の画像をAIの技術で解析し、大まかな性格タイプを分類するアプリケーションを作成しました。大学で学んだ画像処理技術を活用して特徴を抽出しています。入力される画像は猫であることを前提としているのでそれ以外の画像は使用しないでください、壊れます。";
    const selfIntroduction = "愛知県出身、東京在住のエンジニア。副業や問い合わせの連絡は↓のツイッターアカウントまで";
    const twitterAccount = "righthandcat";

    return (
        <div className="setting-container">
            <div className="setting-section">
                <h2>アプリの説明</h2>
                <p>{appDescription}</p>
            </div>

            <div className="setting-section">
                <h2>自己紹介</h2>
                <p>{selfIntroduction}</p>
            </div>

            <div className="setting-section">
                <h2>Twitter</h2>
                <p>
                    <a href={`https://twitter.com/${twitterAccount}`}
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="twitter-link">
                        @{twitterAccount}
                    </a>
                </p>
            </div>
        </div>
    );
});
