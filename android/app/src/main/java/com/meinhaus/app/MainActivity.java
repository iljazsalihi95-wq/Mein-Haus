package com.meinhaus.app;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {
  private WebView web;
  private ProgressBar progress;
  private TextView offline;
  private static final String APP_URL = "https://mein-haus-shtepia-ime.netlify.app/";

  @Override public void onCreate(Bundle b){
    super.onCreate(b);
    getWindow().setStatusBarColor(Color.WHITE);
    getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
    FrameLayout root=new FrameLayout(this);
    web=new WebView(this);
    progress=new ProgressBar(this,null,android.R.attr.progressBarStyleHorizontal);
    offline=new TextView(this);
    offline.setText("Nuk ka lidhje me internetin.\nKeine Internetverbindung.");
    offline.setTextSize(17); offline.setGravity(17); offline.setVisibility(View.GONE);
    root.addView(web,new FrameLayout.LayoutParams(-1,-1));
    root.addView(progress,new FrameLayout.LayoutParams(-1,8));
    root.addView(offline,new FrameLayout.LayoutParams(-1,-1));
    setContentView(root);
    WebSettings s=web.getSettings();
    s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true); s.setDatabaseEnabled(true);
    s.setAllowFileAccess(false); s.setAllowContentAccess(true); s.setCacheMode(WebSettings.LOAD_NO_CACHE);\n    s.setJavaScriptCanOpenWindowsAutomatically(true); s.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
    s.setUserAgentString(s.getUserAgentString()+" MeinHausAndroid/1.0");
    web.clearCache(true);\n    CookieManager.getInstance().setAcceptCookie(true);
    CookieManager.getInstance().setAcceptThirdPartyCookies(web,true);
    web.setWebChromeClient(new WebChromeClient(){
      @Override public void onProgressChanged(WebView v,int p){progress.setProgress(p);progress.setVisibility(p>=100?View.GONE:View.VISIBLE);}
    });
    web.setWebViewClient(new WebViewClient(){
      @Override public void onPageFinished(WebView v,String u){offline.setVisibility(View.GONE);}
      @Override public void onReceivedError(WebView v,WebResourceRequest r,android.webkit.WebResourceError e){
        if(r.isForMainFrame()){offline.setVisibility(View.VISIBLE);Toast.makeText(MainActivity.this,"Verbindung fehlgeschlagen",Toast.LENGTH_SHORT).show();}
      }
    });
    web.loadUrl(APP_URL+"?android="+System.currentTimeMillis());
  }
  @Override public void onBackPressed(){if(web!=null&&web.canGoBack())web.goBack();else super.onBackPressed();}
  @Override protected void onDestroy(){if(web!=null){web.destroy();web=null;}super.onDestroy();}
}
