import React, { useEffect } from 'react';

// 広告タイプの型
type AdmaxAdType = {
    admax_id: string; // 広告ID
    type: string; // PC/SP切替広告なら"switch"
};

// windowオブジェクトの拡張
declare global {
    interface Window {
        admaxads: AdmaxAdType[];
        __admax_tag__?: any;
    }
}

// PC/SP切替広告のReactコンポーネント
const AdmaxSwitch: React.FC<{ id: string }> = (props) => {
    useEffect(() => {
        // windowオブジェクトの広告リストを初期化
        if (!window.admaxads)
            window.admaxads = [];
        // 広告リストを取得
        const admaxads: AdmaxAdType[] = window.admaxads;
        // 広告リストになかったら追加
        if (!admaxads.some(ad => ad.admax_id === props.id))
            admaxads.push({
                admax_id: props.id,
                type: "switch"
            });
        // 外部JSを読み込んで広告リストを実際に表示
        const tag = document.createElement('script');
        tag.src = 'https://adm.shinobi.jp/s/d4ff05e58b319d4038b42af8ed66584a';
        tag.async = false;
        document.body.appendChild(tag);
        // アンマウント時にJSタグと広告情報を削除
        return () => {
            document.body.removeChild(tag);
            admaxads.splice(admaxads.findIndex(ad => ad.admax_id === props.id), 1);
            window.__admax_tag__ = undefined;
        }
    }, [props.id]); // props.idが変更された時にのみ再実行

    return <div className="admax-switch" data-admax-id={props.id} style={{ display: "inline-block" }} />
}

export default AdmaxSwitch;
