plugins { id("com.android.application") }
android {
    namespace = "com.meinhaus.app"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.meinhaus.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 5
        versionName = "1.3.0-parity"
    }
    buildTypes { release { isMinifyEnabled = false } }
}
dependencies {
    implementation("com.google.zxing:core:3.5.3")
    implementation("androidx.webkit:webkit:1.12.1")
}