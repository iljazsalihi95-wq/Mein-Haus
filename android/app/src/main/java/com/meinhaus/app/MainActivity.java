package com.meinhaus.app;

import android.app.*;
import android.content.*;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.view.*;
import android.widget.*;
import java.text.SimpleDateFormat;
import java.util.*;

public class MainActivity extends Activity {
  private LinearLayout body;
  private final int BLUE=Color.rgb(20,105,235), TEXT=Color.rgb(24,36,56), MUTED=Color.rgb(93,108,130), BG=Color.rgb(245,248,253);

  @Override public void onCreate(Bundle b){super.onCreate(b);getWindow().setStatusBarColor(Color.WHITE);getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);showHome();}

  private int dp(int v){return (int)(v*getResources().getDisplayMetrics().density+.5f);}
  private GradientDrawable bg(int color,int radius){GradientDrawable g=new GradientDrawable();g.setColor(color);g.setCornerRadius(dp(radius));return g;}
  private TextView txt(String s,float sp,boolean bold){TextView v=new TextView(this);v.setText(s);v.setTextSize(sp);v.setTextColor(TEXT);v.setPadding(dp(14),dp(10),dp(14),dp(10));if(bold)v.setTypeface(null,1);return v;}
  private Button button(String s){Button b=new Button(this);b.setText(s);b.setAllCaps(false);b.setTextSize(15);return b;}
  private EditText input(String hint){EditText e=new EditText(this);e.setHint(hint);e.setSingleLine(true);e.setPadding(dp(14),dp(12),dp(14),dp(12));e.setBackground(bg(Color.WHITE,14));LinearLayout.LayoutParams p=new LinearLayout.LayoutParams(-1,-2);p.setMargins(0,dp(6),0,dp(8));e.setLayoutParams(p);return e;}

  private void shell(String heading){
    LinearLayout root=new LinearLayout(this);root.setOrientation(LinearLayout.VERTICAL);root.setBackgroundColor(BG);
    LinearLayout top=new LinearLayout(this);top.setGravity(Gravity.CENTER_VERTICAL);top.setPadding(dp(16),dp(10),dp(10),dp(8));
    TextView t=txt(heading,25,true);top.addView(t,new LinearLayout.LayoutParams(0,-2,1));TextView bell=txt("🔔",22,false);bell.setOnClickListener(v->showNotifications());top.addView(bell);root.addView(top);
    ScrollView sv=new ScrollView(this);body=new LinearLayout(this);body.setOrientation(LinearLayout.VERTICAL);body.setPadding(dp(14),0,dp(14),dp(24));sv.addView(body);root.addView(sv,new LinearLayout.LayoutParams(-1,0,1));
    LinearLayout nav=new LinearLayout(this);nav.setPadding(dp(3),dp(3),dp(3),dp(6));nav.setBackgroundColor(Color.WHITE);
    String[] n={"🏠\nBallina","👨‍👩‍👧\nFamilja","📅\nTerminat","🛒\nBlerjet","☰\nMë shumë"};
    View.OnClickListener[] l={v->showHome(),v->showFamily(),v->showAppointments(),v->showShopping(),v->showMore()};
    for(int i=0;i<n.length;i++){Button b=button(n[i]);b.setTextSize(11);b.setOnClickListener(l[i]);nav.addView(b,new LinearLayout.LayoutParams(0,dp(58),1));}root.addView(nav);setContentView(root);
  }

  private void card(String h,String d,View.OnClickListener l){
    LinearLayout c=new LinearLayout(this);c.setOrientation(LinearLayout.VERTICAL);c.setPadding(dp(10),dp(8),dp(10),dp(8));c.setBackground(bg(Color.WHITE,18));c.setElevation(dp(2));
    TextView a=txt(h,19,true),x=txt(d,14,false);x.setTextColor(MUTED);c.addView(a);c.addView(x);if(l!=null)c.setOnClickListener(l);
    LinearLayout.LayoutParams p=new LinearLayout.LayoutParams(-1,-2);p.setMargins(0,dp(6),0,dp(9));body.addView(c,p);
  }
  private void section(String s){TextView t=txt(s,17,true);t.setTextColor(BLUE);body.addView(t);}

  private void showHome(){
    shell("MeinHaushalt FT");
    String date=new SimpleDateFormat("EEEE, dd.MM.yyyy",Locale.GERMANY).format(new Date());
    TextView welcome=txt("Mirë se vini / Willkommen\n"+date,16,false);welcome.setTextColor(MUTED);body.addView(welcome);
    card("👨‍👩‍👧‍👦  Familja","Anëtarët, profilet dhe detyrat e shtëpisë",v->showFamily());
    card("📅  Terminat","Takimet e ardhshme dhe paralajmërimet",v->showAppointments());
    card("🛒  Lista ime e Blerjeve","Produktet që mungojnë dhe ato të blera",v->showShopping());
    card("🏷️  Ofertat Ditore","Oferta sipas dyqaneve dhe kategorive",v->showOffers());
    card("📦  Inventari","Gjendja e produkteve dhe paralajmërimi kur mbarojnë",v->showInventory());
    card("💶  Financat","Hyrje, dalje dhe bilanci i familjes",v->showFinance());
    card("🏠  Detyrat e Shtëpisë","Pastrimi, detyrat ditore dhe kujtimet familjare",v->showTasks());
    card("📄  Dokumentet & Garancitë","Faturat, kontratat, garancitë dhe skadimet",v->showDocuments());
    card("🧾  Faturat & Abonimet","Rryma, interneti, sigurimet dhe pagesat periodike",v->showBills());
    card("🚮  Kalendari i Mbeturinave","Gelber Sack, Restmüll, Bio dhe Papier",v->showWaste());
    card("🚨  Emergjenca","Kontaktet e shpejta dhe informacioni i shtëpisë",v->showEmergency());
  }

  private void showFamily(){shell("Familja");section("Anëtarët e familjes");card("👤 Ilaz","Profili kryesor • Administrator",null);body.addView(button("+ Shto anëtar"));}
  private void showAppointments(){shell("Terminat");section("Terminat e ardhshme");card("📅 Kalendar","Shto termin, datë, orë dhe përshkrim",null);EditText t=input("Titulli i terminit");body.addView(t);EditText d=input("Data / ora");body.addView(d);Button save=button("Ruaj terminin");save.setOnClickListener(v->Toast.makeText(this,"Termini u ruajt lokalisht",Toast.LENGTH_SHORT).show());body.addView(save);}
  private void showShopping(){shell("Lista e Blerjeve");section("Çfarë duhet të blej?");EditText p=input("Shto produkt");body.addView(p);Button add=button("+ Shto në listë");add.setOnClickListener(v->{if(p.getText().length()>0){getPreferences(MODE_PRIVATE).edit().putString("shopping",p.getText().toString()).apply();Toast.makeText(this,"U shtua",Toast.LENGTH_SHORT).show();p.setText("");}});body.addView(add);String saved=getPreferences(MODE_PRIVATE).getString("shopping","");if(!saved.isEmpty())card("🛒 "+saved,"Në pritje për blerje",null);}
  private void showOffers(){shell("Ofertat Ditore");section("Dyqanet");card("🛍️ Ofertat","Këtu do të lidhen ofertat reale sipas dyqanit.",null);}
  private void showInventory(){shell("Inventari");section("Produktet në shtëpi");card("📦 Inventari","Sasi, kategori dhe minimumi për paralajmërim.",null);}
  private void showFinance(){shell("Financat");section("Bilanci");card("💶 Hyrjet","Regjistro të ardhurat.",null);card("💳 Daljet","Regjistro shpenzimet.",null);card("📊 Gjendja","Përmbledhja mujore dhe vjetore.",null);}
  private void showTasks(){shell("Detyrat e Shtëpisë");section("Sot");card("🧹 Pastrimi","Ndaj detyrat sipas anëtarit dhe shëno përfundimin.",null);card("🔁 Detyrat periodike","Ditore, javore dhe mujore.",null);}
  private void showDocuments(){shell("Dokumentet & Garancitë");section("Arkiva familjare");card("📄 Dokumentet","Kontrata, fatura, dokumente dhe fotografi.",null);card("🛡️ Garancitë","Data e blerjes, skadimi dhe kujtesa para skadimit.",null);}
  private void showBills(){shell("Faturat & Abonimet");section("Pagesat periodike");card("⚡ Shërbimet","Rrymë, gaz, ujë, internet dhe telefon.",null);card("🔁 Abonimet","Shuma, data e pagesës dhe paralajmërimi.",null);}
  private void showWaste(){shell("Kalendari i Mbeturinave");section("Frankenthal • Burim zyrtar EWF");card("♻️ Abfallkalender LIVE","Terminet nuk ruhen si placeholder. Moduli do të marrë të dhënat zyrtare sipas adresës dhe llojit: Gelber Sack • Restmüll • Bio • Papier.",null);card("📍 Adresa","Zgjidh adresën e shtëpisë për kalendarin personal.",null);card("🔄 Sinkronizimi","iCal / të dhënat e importit nga kalendari zyrtar i Frankenthal.",null);card("🔔 Kujtesa Android","Njoftim lokal një ditë përpara terminit të marrë nga burimi zyrtar.",null);}
  private void showEmergency(){shell("Emergjenca");section("Qasje e shpejtë");card("☎️ Kontaktet","Numrat dhe kontaktet e zgjedhura të familjes.",null);card("🏠 Informacioni i shtëpisë","Të dhëna të rëndësishme për raste urgjente.",null);}
  private void showNotifications(){shell("Njoftimet");card("🔔 Qendra e njoftimeve","Terminat, lista e blerjeve, inventari dhe familja.",null);}
  private void showProfile(){shell("Profili");card("👤 MeinHaushalt FT","Profili, gjuha, pamja dhe siguria.",null);}
  private void showMore(){shell("Më shumë");card("🏷️ Ofertat", "Ofertat ditore",v->showOffers());card("📦 Inventari","Menaxhimi i stokut",v->showInventory());card("💶 Financat","Hyrje, dalje, bilanci",v->showFinance());card("🔔 Njoftimet","Qendra e lajmërimeve",v->showNotifications());card("🏠 Detyrat","Detyrat e shtëpisë",v->showTasks());card("📄 Dokumentet","Dokumentet & garancitë",v->showDocuments());card("🧾 Faturat","Faturat & abonimet",v->showBills());card("🚮 Mbeturinat","Kalendari i mbeturinave",v->showWaste());card("🚨 Emergjenca","Qasje e shpejtë",v->showEmergency());card("👤 Profili","Llogaria dhe cilësimet",v->showProfile());}
}
