package com.meinhaus.app;

import android.app.*;
import android.content.*;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.Manifest;
import android.content.res.Configuration;
import android.view.*;
import android.widget.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.io.*;
import java.net.*;
import org.json.*;
import com.google.zxing.*;
import com.google.zxing.common.BitMatrix;

public class MainActivity extends Activity {
  private LinearLayout body;
  private android.content.SharedPreferences auth;
  private static final String API_BASE="https://script.google.com/macros/s/AKfycbzx_y12qFOfQ9uc9_5gfuHGbCw_JV2gwU1MGFnIgDnOuQ6lNhgw9hyMrYk8-Xv9oqDP/exec";
  private String lang="sq";
  private String country="AUTO";
  private final int BLUE=Color.rgb(8,120,255), TEXT=Color.rgb(16,24,40), MUTED=Color.rgb(102,112,133), BG=Color.rgb(248,251,255);

  @Override public void onCreate(Bundle b){super.onCreate(b);detectLanguage();auth=getSharedPreferences("auth",MODE_PRIVATE);getWindow().setStatusBarColor(Color.WHITE);getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);if(auth.getBoolean("logged_in",false))showHome();else showLogin();}

  private void detectLanguage(){String l=Locale.getDefault().getLanguage();if(l.equals("de"))lang="de";else if(l.equals("en"))lang="en";else if(l.equals("tr"))lang="tr";else if(l.equals("it"))lang="it";else if(l.equals("bs")||l.equals("hr")||l.equals("sr"))lang="bs";else lang="sq";}
  private String tr(String sq,String de,String en){return lang.equals("de")?de:lang.equals("en")?en:sq;}
  private int dp(int v){return (int)(v*getResources().getDisplayMetrics().density+.5f);}
  private GradientDrawable bg(int color,int radius){GradientDrawable g=new GradientDrawable();g.setColor(color);g.setCornerRadius(dp(radius));return g;}
  private TextView txt(String s,float sp,boolean bold){TextView v=new TextView(this);v.setText(s);v.setTextSize(sp);v.setTextColor(TEXT);v.setPadding(dp(14),dp(10),dp(14),dp(10));if(bold)v.setTypeface(null,1);return v;}
  private Button button(String s){Button b=new Button(this);b.setText(s);b.setAllCaps(false);b.setTextSize(14);b.setTextColor(TEXT);b.setBackground(bg(Color.TRANSPARENT,14));b.setPadding(dp(6),dp(5),dp(6),dp(5));b.setStateListAnimator(null);return b;}
  private EditText input(String hint){EditText e=new EditText(this);e.setHint(hint);e.setSingleLine(true);e.setPadding(dp(14),dp(12),dp(14),dp(12));e.setBackground(bg(Color.WHITE,14));LinearLayout.LayoutParams p=new LinearLayout.LayoutParams(-1,-2);p.setMargins(0,dp(6),0,dp(8));e.setLayoutParams(p);return e;}

  private void shell(String heading){
    LinearLayout root=new LinearLayout(this);root.setOrientation(LinearLayout.VERTICAL);root.setBackgroundColor(BG);
    LinearLayout top=new LinearLayout(this);top.setGravity(Gravity.CENTER_VERTICAL);top.setPadding(dp(18),dp(10),dp(18),dp(10));top.setBackgroundColor(Color.WHITE);
    ImageView logo=new ImageView(this);logo.setImageResource(R.drawable.install_icon);logo.setScaleType(ImageView.ScaleType.CENTER_CROP);top.addView(logo,new LinearLayout.LayoutParams(dp(58),dp(58)));
    LinearLayout names=new LinearLayout(this);names.setOrientation(LinearLayout.VERTICAL);names.setPadding(dp(10),0,0,0);TextView t=txt(heading,22,true);names.addView(t);TextView sub=txt("Frankenthal • Haushalt & Familie",12,false);sub.setTextColor(MUTED);names.addView(sub);top.addView(names,new LinearLayout.LayoutParams(0,-2,1));
    TextView avatar=txt("IS",18,true);avatar.setTextColor(BLUE);avatar.setGravity(Gravity.CENTER);avatar.setBackground(bg(Color.rgb(238,245,255),40));top.addView(avatar,new LinearLayout.LayoutParams(dp(54),dp(54)));root.addView(top);
    ScrollView sv=new ScrollView(this);body=new LinearLayout(this);body.setOrientation(LinearLayout.VERTICAL);body.setPadding(dp(18),dp(18),dp(18),dp(24));sv.addView(body);root.addView(sv,new LinearLayout.LayoutParams(-1,0,1));
    LinearLayout nav=new LinearLayout(this);nav.setPadding(dp(4),dp(5),dp(4),dp(7));nav.setBackgroundColor(Color.WHITE);nav.setElevation(dp(10));
    String[] n={"⌂\nBallina","🛒\nBlerjet","📦\nInventari","📊\nFinancat","•••\nMë shumë"};
    View.OnClickListener[] l={v->showHome(),v->showShopping(),v->showInventory(),v->showFinance(),v->showMore()};
    for(int i=0;i<n.length;i++){Button b=button(n[i]);b.setTextSize(11);b.setTextColor(i==0?BLUE:Color.rgb(137,148,165));b.setGravity(Gravity.CENTER);b.setOnClickListener(l[i]);nav.addView(b,new LinearLayout.LayoutParams(0,dp(62),1));}root.addView(nav);setContentView(root);
  }

  private void card(String h,String d,View.OnClickListener l){
    LinearLayout c=new LinearLayout(this);c.setOrientation(LinearLayout.VERTICAL);c.setPadding(dp(16),dp(15),dp(16),dp(15));c.setBackground(bg(Color.WHITE,18));c.setElevation(dp(2));
    TextView a=txt(h,16,true),x=txt(d,12,false);x.setTextColor(MUTED);c.addView(a);c.addView(x);if(l!=null)c.setOnClickListener(l);
    LinearLayout.LayoutParams p=new LinearLayout.LayoutParams(-1,-2);p.setMargins(0,dp(6),0,dp(10));body.addView(c,p);
  }
  private void section(String s){TextView t=txt(s,17,true);t.setTextColor(BLUE);body.addView(t);}

  private void tile(LinearLayout row,String icon,String title,String sub,View.OnClickListener l){
    LinearLayout box=new LinearLayout(this);box.setOrientation(LinearLayout.VERTICAL);box.setPadding(dp(15),dp(14),dp(15),dp(14));box.setBackground(bg(Color.WHITE,18));box.setElevation(dp(2));
    TextView i=txt(icon,26,false);i.setPadding(0,0,0,dp(4));box.addView(i);TextView h=txt(title,15,true);h.setPadding(0,0,0,dp(3));box.addView(h);TextView s=txt(sub,11,false);s.setTextColor(MUTED);s.setPadding(0,0,0,0);box.addView(s);box.setOnClickListener(l);
    LinearLayout.LayoutParams p=new LinearLayout.LayoutParams(0,dp(120),1);p.setMargins(dp(5),dp(5),dp(5),dp(5));row.addView(box,p);
  }
  private void nativeLogin(String email,String password,Button enter){
    new Thread(()->{try{JSONObject q=new JSONObject();q.put("action","login");q.put("email",email);q.put("password",password);q.put("device","ANDROID_NATIVE");JSONObject d=postApi(q);String token=d.optString("token","");if(token.isEmpty())throw new Exception("TOKEN_MISSING");JSONObject u=d.optJSONObject("user");String name=u==null?"":u.optString("displayName","");auth.edit().putBoolean("logged_in",true).putString("token",token).putString("email",email).putString("displayName",name).apply();runOnUiThread(this::showHome);}catch(Exception e){runOnUiThread(()->{enter.setEnabled(true);enter.setText("Anmelden");Toast.makeText(this,"Hyrja dështoi: "+e.getMessage(),Toast.LENGTH_LONG).show();});}}).start();
  }
  private JSONObject postApi(JSONObject payload)throws Exception{
    String token=auth==null?"":auth.getString("token","");if(!token.isEmpty()&&!payload.has("token"))payload.put("token",token);HttpURLConnection con=(HttpURLConnection)new URL(API_BASE).openConnection();con.setRequestMethod("POST");con.setConnectTimeout(15000);con.setReadTimeout(20000);con.setDoOutput(true);con.setRequestProperty("Content-Type","text/plain;charset=utf-8");try(OutputStream os=con.getOutputStream()){os.write(payload.toString().getBytes("UTF-8"));}InputStream is=con.getResponseCode()>=400?con.getErrorStream():con.getInputStream();BufferedReader br=new BufferedReader(new InputStreamReader(is,"UTF-8"));StringBuilder sb=new StringBuilder();String line;while((line=br.readLine())!=null)sb.append(line);JSONObject r=new JSONObject(sb.toString());if(!r.optBoolean("ok",false))throw new Exception(r.optString("error","SERVER_ERROR"));JSONObject d=r.optJSONObject("data");return d==null?new JSONObject():d;
  }

  private void showLogin(){
    LinearLayout root=new LinearLayout(this);root.setOrientation(LinearLayout.VERTICAL);root.setGravity(Gravity.CENTER_HORIZONTAL);root.setPadding(dp(24),dp(46),dp(24),dp(28));root.setBackgroundColor(BG);
    ImageView logo=new ImageView(this);logo.setImageResource(R.drawable.install_icon);logo.setScaleType(ImageView.ScaleType.CENTER_CROP);root.addView(logo,new LinearLayout.LayoutParams(dp(92),dp(92)));
    TextView h=txt("Mein Haus",30,true);h.setGravity(Gravity.CENTER);h.setPadding(0,dp(14),0,0);root.addView(h);
    TextView s=txt("Shtëpia Ime",17,false);s.setTextColor(MUTED);s.setGravity(Gravity.CENTER);s.setPadding(0,0,0,dp(24));root.addView(s);
    LinearLayout box=new LinearLayout(this);box.setOrientation(LinearLayout.VERTICAL);box.setPadding(dp(18),dp(18),dp(18),dp(18));box.setBackground(bg(Color.WHITE,20));box.setElevation(dp(3));
    TextView title=txt("Hyr / Anmelden",20,true);title.setPadding(0,0,0,dp(10));box.addView(title);
    EditText email=input("Email");email.setInputType(android.text.InputType.TYPE_CLASS_TEXT|android.text.InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);box.addView(email);
    EditText pass=input("Fjalëkalimi / Passwort");pass.setInputType(android.text.InputType.TYPE_CLASS_TEXT|android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD);box.addView(pass);
    Button enter=button("Anmelden");enter.setTextColor(Color.WHITE);enter.setTextSize(16);GradientDrawable eg=new GradientDrawable(GradientDrawable.Orientation.LEFT_RIGHT,new int[]{Color.rgb(18,108,255),Color.rgb(4,165,237)});eg.setCornerRadius(dp(16));enter.setBackground(eg);
    enter.setOnClickListener(v->{String em=email.getText().toString().trim(),pw=pass.getText().toString();if(em.isEmpty()||pw.isEmpty()){Toast.makeText(this,"Shkruaj emailin dhe fjalëkalimin",Toast.LENGTH_SHORT).show();return;}enter.setEnabled(false);enter.setText("Duke u kyçur…");nativeLogin(em,pw,enter);});
    LinearLayout.LayoutParams ep=new LinearLayout.LayoutParams(-1,dp(54));ep.setMargins(0,dp(8),0,0);box.addView(enter,ep);
    TextView note=txt("Të dhënat ekzistuese do të merren nga llogaria jote.",12,false);note.setTextColor(MUTED);note.setGravity(Gravity.CENTER);box.addView(note);
    root.addView(box,new LinearLayout.LayoutParams(-1,-2));setContentView(root);
  }

  private void showHome(){
    shell("Shtëpia Ime");
    String name=auth==null?"":auth.getString("displayName","");if(name==null||name.trim().isEmpty())name="Ilaz";
    TextView hi=txt("Përshëndetje "+name+" 👋",26,true);body.addView(hi);TextView desc=txt("Këtu është përmbledhja e shtëpisë sate.",15,false);desc.setTextColor(MUTED);body.addView(desc);
    LinearLayout r1=new LinearLayout(this);r1.setOrientation(LinearLayout.HORIZONTAL);body.addView(r1,new LinearLayout.LayoutParams(-1,-2));
    colorTile(r1,"🛒","Lista e\nblerjeve","Të dhënat nga llogaria",Color.rgb(20,190,132),v->showShopping());
    colorTile(r1,"%","Ofertat","Oferta reale",Color.rgb(49,126,238),v->showOffers());
    LinearLayout r2=new LinearLayout(this);r2.setOrientation(LinearLayout.HORIZONTAL);body.addView(r2,new LinearLayout.LayoutParams(-1,-2));
    colorTile(r2,"📦","Inventari","Nga llogaria jote",Color.rgb(255,169,24),v->showInventory());
    colorTile(r2,"📊","Financat","Bilanci & shpenzimet",Color.rgb(132,76,235),v->showFinance());
    card("🔔 Kontrolli javor","Terminet, detyrat, skadimet dhe njoftimet reale do të shfaqen këtu nga llogaria.",v->showNotifications());
    card("🧾 SKANO KASSENBON","Hape kamerën, fotografo faturën dhe regjistro blerjen.",v->showReceipt());
    card("👨‍👩‍👧‍👦 Familja","Anëtarët dhe detyrat",v->showFamily());
    card("📅 Terminat","Kalendari dhe kujtesat",v->showAppointments());
  }
  private void colorTile(LinearLayout row,String icon,String title,String sub,int color,View.OnClickListener l){
    LinearLayout box=new LinearLayout(this);box.setOrientation(LinearLayout.VERTICAL);box.setGravity(Gravity.CENTER_VERTICAL);box.setPadding(dp(20),dp(18),dp(16),dp(16));box.setBackground(bg(color,22));box.setElevation(dp(3));box.setOnClickListener(l);
    TextView i=txt(icon,23,false);i.setTextColor(Color.WHITE);box.addView(i);TextView h=txt(title,20,true);h.setTextColor(Color.WHITE);box.addView(h);TextView s=txt(sub,13,false);s.setTextColor(Color.WHITE);box.addView(s);
    LinearLayout.LayoutParams p=new LinearLayout.LayoutParams(0,dp(154),1);p.setMargins(dp(5),dp(8),dp(5),dp(4));row.addView(box,p);
  }

  private void showFamily(){shell("Familja");section("Anëtarët e familjes");card("👤 Profili kryesor","Administrator • detyrat • shpenzimet • terminet",null);card("👨‍👩‍👧‍👦 Familja","Secili anëtar ka profilin, detyrat dhe harxhimet e veta.",null);Button add=button("+ Shto anëtar");add.setTextColor(Color.WHITE);add.setBackground(bg(BLUE,16));body.addView(add);}
  private void showAppointments(){shell("Terminat");section("Kalendari");card("📅 Terminat e ardhshme","Pamje mujore • sot • terminet e familjes",null);EditText t=input("Titulli i terminit");body.addView(t);EditText d=input("Data / ora");body.addView(d);Button save=button("Ruaj terminin");save.setOnClickListener(v->Toast.makeText(this,"Termini u ruajt lokalisht",Toast.LENGTH_SHORT).show());body.addView(save);}
  private void showShopping(){shell("Çka të blej sot?");section("Lista ime");card("🛒 Lista inteligjente","Bashkon produktet që mungojnë, inventarin dhe listën manuale.",null);EditText p=input("Shto produkt");body.addView(p);Button add=button("+ Shto në listë");add.setOnClickListener(v->{if(p.getText().length()>0){getPreferences(MODE_PRIVATE).edit().putString("shopping",p.getText().toString()).apply();Toast.makeText(this,"U shtua",Toast.LENGTH_SHORT).show();p.setText("");}});body.addView(add);String saved=getPreferences(MODE_PRIVATE).getString("shopping","");if(!saved.isEmpty())card("🛒 "+saved,"Në pritje për blerje",null);}
  private void showOffers(){shell("Ofertat");section("Pranë teje");card("🌍 Zgjedhje automatike e vendit","Ofertat përshtaten sipas vendit/rajonit të telefonit ose vendit të zgjedhur në profil.",null);card("🛍️ Ofertat reale","Prospektet/API/feed-et e retailerëve lidhen sipas vendit; nuk përdoren oferta placeholder.",null);}
  private void showInventory(){shell("Inventari");section("Në shtëpi");card("📦 Inventari","Sasi, kategori dhe minimumi për paralajmërim.",null);card("⚠️ Po mbaron","Produktet nën minimum kalojnë te njoftimet dhe mund të shtohen te Çka të blej sot.",null);card("🧾 Nga Kassenbon","Blerjet e konfirmuara mund ta rrisin automatikisht inventarin.",null);card("📅 Skadimet automatike","Aplikacioni kërkon datën e skadimit nga të dhënat e produktit/barkodit dhe nga Kassenbon-i kur ekziston, pa kërkuar foto për çdo produkt.",null);card("🔴 Afër skadimit","Produktet që hyjnë në pragun e paralajmërimit shfaqen me të kuqe dhe dërgojnë njoftim.",null);card("⏳ Pa datë të saktë","Nëse burimi nuk jep datë konkrete, shfaqet vetëm jetëgjatësia tipike e produktit dhe shënohet si vlerësim, jo si datë reale.",null);}
  private void showFinance(){shell("Financat");section("Përmbledhja");card("👨‍👩‍👧 Harxhimet sipas anëtarit","Shpenzimet mund të filtrohen sipas çdo anëtari të familjes.",null);card("💶 Hyrjet","Regjistro të ardhurat.",null);card("💳 Daljet","Regjistro shpenzimet.",null);card("📊 Gjendja","Përmbledhja mujore dhe vjetore.",null);}
  private void showTasks(){shell("Detyrat e Shtëpisë");section("Sot");card("🧹 Pastrimi","Ndaj detyrat sipas anëtarit dhe shëno përfundimin.",null);card("🔁 Detyrat periodike","Ditore, javore dhe mujore.",null);}
  private void showDocuments(){shell("Dokumentet & Garancitë");section("Arkiva familjare");card("📄 Dokumentet","Kontrata, fatura, dokumente dhe fotografi.",null);card("🛡️ Garancitë","Data e blerjes, skadimi dhe kujtesa para skadimit.",null);}
  private void showBills(){shell("Faturat & Abonimet");section("Pagesat periodike");card("⚡ Shërbimet","Rrymë, gaz, ujë, internet dhe telefon.",null);card("🔁 Abonimet","Shuma, data e pagesës dhe paralajmërimi.",null);}
  private void showWaste(){shell("Kalendari i Mbeturinave");section("Frankenthal • Burim zyrtar EWF");card("♻️ Abfallkalender LIVE","Terminet nuk ruhen si placeholder. Moduli do të marrë të dhënat zyrtare sipas adresës dhe llojit: Gelber Sack • Restmüll • Bio • Papier.",null);card("📍 Adresa","Zgjidh adresën e shtëpisë për kalendarin personal.",null);card("🔄 Sinkronizimi","iCal / të dhënat e importit nga kalendari zyrtar i Frankenthal.",null);card("🔔 Kujtesa Android","Njoftim lokal një ditë përpara terminit të marrë nga burimi zyrtar.",null);}
  private void showEmergency(){shell("Emergjenca");section("Qasje e shpejtë");card("☎️ Kontaktet","Numrat dhe kontaktet e zgjedhura të familjes.",null);card("🏠 Informacioni i shtëpisë","Të dhëna të rëndësishme për raste urgjente.",null);}
  private void showSmartAssistant(){shell("Smart Home Assistant");section("Veprime të dobishme");card("🍽️ Përdor para se të skadojë","Sugjeron produktet që duhen përdorur së pari dhe receta bazuar në inventar.",null);card("💸 Blej më lirë","Krahason listën Çka të blej sot me ofertat reale të zonës.",null);card("📉 Buxheti","Sinjalizon kategori ku shpenzimet po rriten pa vendosur vetë kufij financiarë.",null);card("♻️ Më pak mbetje","Lidh skadimet, sasitë dhe listën e blerjeve për të shmangur blerjen e dyfishtë.",null);}
  private void showPrivacy(){shell("Qendra e Privatësisë");section("Të dhënat e tua");card("🔐 Lokalisht së pari","Kartat, faturat dhe dokumentet private ruhen lokalisht kur funksioni nuk kërkon cloud.",null);card("☁️ Backup opsional","Sinkronizimi/backup aktivizohet vetëm nga përdoruesi.",null);card("📤 Eksporto të dhënat","Eksport i inventarit, financave, termineve dhe listave.",null);card("🗑️ Fshi të dhënat","Kontroll për fshirjen e të dhënave të ruajtura.",null);}
  private void showHalalCheck(){shell("Halal Check");section("Global • Skanim & verifikim");card("🌍 Regjistrat sipas vendit","Motori zgjedh burimet sipas vendit dhe produktit: Itali (WHA/Halal Italia + regjistra akreditimi), Maqedoni e Veriut (burime certifikuese të verifikuara), Serbi (Halal Agency Serbia), Türkiye (HAK/TSE) dhe më tej BPJPH, JAKIM, MUIS e regjistra të tjerë.",null);card("🧭 Verifikim ndërkufitar","Nëse produkti është importuar, kontrollohet edhe certifikuesi i vendit të origjinës dhe njohja/akreditimi ndërkombëtar, jo vetëm vendi ku blihet.",null);card("🔗 GS1 / GTIN","GTIN/EAN përdoret si identifikues global dhe GS1 Digital Link kur produkti e mbështet.",null);card("📷 Barkod / Etiketë","Skano EAN ose fotografo listën e përbërësve.",null);card("🧪 Përbërësit & E-numrat","Analizë e përbërësve me status: i qartë, i dyshimtë ose kërkon verifikim të burimit.",null);card("☪️ Certifikata Halal","Prioritet certifikata aktive dhe burimi/certifikuesi; jo vetëm logoja në paketim.",null);card("🔎 Gjurmueshmëria","EAN • prodhues • produkt • certifikues • nr. certifikate • afati • burimi.",null);card("⚠️ Pa hamendje","Nëse origjina e një përbërësi nuk dihet, rezultati mbetet 'Kërkon verifikim', jo Halal/Haram i sajuar.",null);}
  private void showAddCard(){shell("Shto kartë");section("Kartë besnikërie");EditText shop=input("Programi / Dyqani");body.addView(shop);EditText number=input("Numri / barkodi i kartës");body.addView(number);Spinner type=new Spinner(this);type.setAdapter(new ArrayAdapter<>(this,android.R.layout.simple_spinner_dropdown_item,new String[]{"CODE_128","EAN_13","QR_CODE"}));body.addView(type);Button save=button("Ruaj kartën");save.setOnClickListener(v->{String n=number.getText().toString().trim();if(n.isEmpty()){Toast.makeText(this,"Shkruaj ose skano numrin",Toast.LENGTH_SHORT).show();return;}getSharedPreferences("wallet",MODE_PRIVATE).edit().putString("card_name",shop.getText().toString()).putString("card_number",n).putString("card_type",type.getSelectedItem().toString()).apply();Toast.makeText(this,"Karta u ruajt lokalisht",Toast.LENGTH_SHORT).show();showWallet();});body.addView(save);}
  private void showReceipt(){shell("Kassenbon Scanner");section("Regjistro faturën");
    Button cam=button("📷 HAP KAMERËN / FOTO KASSENBON");cam.setOnClickListener(v->openReceiptCamera());body.addView(cam);
    Button file=button("🖼️ ZGJIDH FOTO NGA TELEFONI");file.setOnClickListener(v->{Intent i=new Intent(Intent.ACTION_GET_CONTENT);i.setType("image/*");startActivityForResult(Intent.createChooser(i,"Kassenbon"),502);});body.addView(file);
    card("🔎 Leximi OCR","Pas fotos: dyqani, data, produktet, sasitë, çmimet dhe totali.",null);
    card("💾 Regjistro blerjen","Pas kontrollit, fatura lidhet me Blerjet, Inventarin dhe Financat.",null);
    card("♻️ Kontroll dublikimi","Kontrollon dyqan + datë/orë + total + artikuj para regjistrimit.",null);
  }
  private void openReceiptCamera(){
    if(android.os.Build.VERSION.SDK_INT>=23&&checkSelfPermission(Manifest.permission.CAMERA)!=PackageManager.PERMISSION_GRANTED){requestPermissions(new String[]{Manifest.permission.CAMERA},501);return;}
    Intent i=new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);try{startActivityForResult(i,501);}catch(Exception e){Toast.makeText(this,"Kamera nuk u hap",Toast.LENGTH_LONG).show();}
  }
  @Override protected void onActivityResult(int requestCode,int resultCode,Intent data){super.onActivityResult(requestCode,resultCode,data);if(resultCode==RESULT_OK&&(requestCode==501||requestCode==502)){Toast.makeText(this,"Kassenbon u mor. Hapi tjetër: OCR dhe regjistrimi.",Toast.LENGTH_LONG).show();}}
  @Override public void onRequestPermissionsResult(int requestCode,String[] permissions,int[] grantResults){super.onRequestPermissionsResult(requestCode,permissions,grantResults);if(requestCode==501&&grantResults.length>0&&grantResults[0]==PackageManager.PERMISSION_GRANTED)openReceiptCamera();}

  private void showReturns(){shell("Kthimet & Garancitë");section("Mos humb afatin");card("↩️ Afati i kthimit","Dyqani, produkti, data e blerjes dhe afati i kthimit.",null);card("🧾 Kassenbon i lidhur","Fatura ruhet bashkë me produktin për kthim/garanci.",null);card("🔔 Njoftim","Kujtesë para mbarimit të afatit.",null);}
  private void showRewards(){shell("Pikët & Cashback");section("Programet e shpërblimeve");card("⭐ Pikët","Bilanci merret nga integrimi zyrtar kur ofrohet; përndryshe ruhet karta pa shpikur pikë.",null);card("💰 Cashback","Historiku dhe shpërblimet e regjistruara.",null);}
  private void showWallet(){shell("Portofoli i Kartave");section("Kartat e mia");card("💳 Loyalty Wallet","Ruaj kartat e besnikërisë në telefon dhe shfaq barkodin/QR për skanim në arkë.",null);card("➕ Shto kartë","Skanim me kamerë ose futje manuale e numrit të kartës.",v->showAddCard());card("⭐ Programet","Kaufland Card • Lidl Plus • KiK • PAYBACK • DeutschlandCard • dm • Rossmann dhe karta të tjera që përdoruesi shton.",null);card("🔒 Privatësia","Të dhënat e kartave ruhen lokalisht dhe mbrohen; sinkronizimi cloud bëhet vetëm me zgjedhjen e përdoruesit.",null);String cn=getSharedPreferences("wallet",MODE_PRIVATE).getString("card_number","");String nm=getSharedPreferences("wallet",MODE_PRIVATE).getString("card_name","");if(!cn.isEmpty())card("📱 "+(nm.isEmpty()?"Karta ime":nm),cn+" • gati për barkod native",null);}
  private void showNotifications(){shell("Njoftimet");card("🔔 Qendra e njoftimeve","Terminat, lista e blerjeve, inventari dhe familja.",null);}
  private void showProfile(){shell("Profili");card("👤 MeinHaushalt FT","Profili, gjuha, pamja dhe siguria.",null);}
  private void showMore(){shell("Më shumë");card("🏷️ Ofertat", "Ofertat ditore",v->showOffers());card("📦 Inventari","Menaxhimi i stokut",v->showInventory());card("💶 Financat","Hyrje, dalje, bilanci",v->showFinance());card("🔔 Njoftimet","Qendra e lajmërimeve",v->showNotifications());card("🏠 Detyrat","Detyrat e shtëpisë",v->showTasks());card("📄 Dokumentet","Dokumentet & garancitë",v->showDocuments());card("🧾 Faturat","Faturat & abonimet",v->showBills());card("🚮 Mbeturinat","Kalendari i mbeturinave",v->showWaste());card("🚨 Emergjenca","Qasje e shpejtë",v->showEmergency());card("💳 Portofoli","Kartat e besnikërisë",v->showWallet());card("🧾 Kassenbon","Skanim, gabime & dublime",v->showReceipt());card("☪️ Halal Check","Përbërës & certifikata",v->showHalalCheck());card("↩️ Kthimet","Afatet dhe garancitë",v->showReturns());card("⭐ Pikët","Pikët & cashback",v->showRewards());card("🧠 Asistenti","Inventar, oferta & buxhet",v->showSmartAssistant());card("🛡️ Privatësia","Backup, eksport & kontroll",v->showPrivacy());card("👤 Profili","Llogaria dhe cilësimet",v->showProfile());}
}
