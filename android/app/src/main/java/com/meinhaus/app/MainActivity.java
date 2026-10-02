package com.meinhaus.app;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.*;

public class MainActivity extends Activity {
  private LinearLayout body;
  private TextView title;

  @Override public void onCreate(Bundle b) {
    super.onCreate(b);
    getWindow().setStatusBarColor(Color.WHITE);
    getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
    showHome();
  }

  private TextView text(String s, float sp, boolean bold) {
    TextView v=new TextView(this); v.setText(s); v.setTextSize(sp); v.setTextColor(Color.rgb(20,35,55));
    v.setPadding(18,14,18,14); if(bold) v.setTypeface(null,1); return v;
  }

  private Button nav(String s, View.OnClickListener l) {
    Button b=new Button(this); b.setText(s); b.setAllCaps(false); b.setOnClickListener(l); return b;
  }

  private void shell(String heading) {
    LinearLayout root=new LinearLayout(this); root.setOrientation(LinearLayout.VERTICAL); root.setBackgroundColor(Color.rgb(246,249,253));
    title=text(heading,26,true); title.setPadding(22,24,22,18); root.addView(title,new LinearLayout.LayoutParams(-1,-2));
    ScrollView scroll=new ScrollView(this); body=new LinearLayout(this); body.setOrientation(LinearLayout.VERTICAL); body.setPadding(14,6,14,90);
    scroll.addView(body); root.addView(scroll,new LinearLayout.LayoutParams(-1,0,1));
    LinearLayout bottom=new LinearLayout(this); bottom.setGravity(Gravity.CENTER); bottom.setPadding(4,4,4,8);
    bottom.addView(nav("🏠 Ballina",v->showHome()),new LinearLayout.LayoutParams(0,-2,1));
    bottom.addView(nav("👨‍👩‍👧 Familja",v->showFamily()),new LinearLayout.LayoutParams(0,-2,1));
    bottom.addView(nav("📅 Terminat",v->showAppointments()),new LinearLayout.LayoutParams(0,-2,1));
    bottom.addView(nav("🛒 Blerjet",v->showShopping()),new LinearLayout.LayoutParams(0,-2,1));
    root.addView(bottom); setContentView(root);
  }

  private void card(String h,String d,View.OnClickListener l) {
    LinearLayout c=new LinearLayout(this); c.setOrientation(LinearLayout.VERTICAL); c.setPadding(14,10,14,10);
    TextView a=text(h,20,true), x=text(d,15,false); c.addView(a); c.addView(x); if(l!=null)c.setOnClickListener(l);
    LinearLayout.LayoutParams p=new LinearLayout.LayoutParams(-1,-2); p.setMargins(0,6,0,8); body.addView(c,p);
  }

  private void showHome(){
    shell("MeinHaushalt FT");
    body.addView(text("Mirë se vini / Willkommen",18,false));
    card("👨‍👩‍👧‍👦 Familja","Anëtarët, profilet dhe detyrat",v->showFamily());
    card("📅 Terminat","Takimet dhe paralajmërimet",v->showAppointments());
    card("🛒 Lista e Blerjeve","Çfarë mungon dhe çfarë është blerë",v->showShopping());
    card("🏷️ Ofertat","Ofertat ditore sipas dyqaneve",v->showOffers());
    card("📦 Inventari","Gjendja e produkteve në shtëpi",v->showInventory());
    card("💶 Financat","Hyrjet, daljet dhe bilanci",v->showFinance());
    card("🔔 Njoftimet","Lajmërimet e familjes",v->showNotifications());
    card("👤 Profili","Llogaria dhe cilësimet",v->showProfile());
  }
  private void showFamily(){shell("Familja");card("Anëtarët e familjes","Profile, role dhe detyra.",null);}
  private void showAppointments(){shell("Terminat");card("Terminat e familjes","Kalendar, përshkrim dhe paralajmërime.",null);}
  private void showShopping(){shell("Lista e Blerjeve");card("Lista ime","Produktet që mungojnë dhe ato të blera.",null);}
  private void showOffers(){shell("Ofertat Ditore");card("Dyqanet & ofertat","Kategoritë dhe ofertat aktuale.",null);}
  private void showInventory(){shell("Inventari");card("Inventari i shtëpisë","Sasia dhe produktet që po mbarojnë.",null);}
  private void showFinance(){shell("Financat");card("Hyrje • Dalje • Bilanci","Menaxhimi financiar i familjes.",null);}
  private void showNotifications(){shell("Njoftimet");card("Njoftime","Paralajmërime për termine, blerje dhe inventar.",null);}
  private void showProfile(){shell("Profili");card("MeinHaushalt FT","Profili, gjuha dhe cilësimet.",null);}
}
