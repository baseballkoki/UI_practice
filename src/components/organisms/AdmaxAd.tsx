import React, { Component } from 'react';

declare global {
    interface Window {
      admaxbanner: any; // もしくはより具体的な型定義を使用
    }
}

class AdmaxAd extends Component {
  componentDidMount() {
    window.admaxbanner = {
      admax_id: 'admax-banner-a6f47668-9e95-450b-aa9b-47caa9dfe8b8',
      tag_id: '07759c94f8e5d6b14adec27dbdf3e98f',
      type: 'b',
      width: 468,
      height: 60
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = "https://adm.shinobi.jp/st/s.js";
    document.body.appendChild(script);
  }

  componentWillUnmount() {
    const scripts = document.querySelectorAll('script[src="https://adm.shinobi.jp/st/s.js"]');
    scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
  }

  render() {
    return (
      <div id="admax-banner-a6f47668-9e95-450b-aa9b-47caa9dfe8b8" style={{ display: "inline-block", width: "468px", height: "60px" }}></div>
    );
  }
}

export default AdmaxAd;
