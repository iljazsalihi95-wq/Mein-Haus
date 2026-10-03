plugins { id("com.android.application") }
android {
    namespace = "com.meinhaus.app"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.meinhaus.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 4
        versionName = "1.2.0-native"
    }
    buildTypes { release { isMinifyEnabled = false } }
}
dependencies {
    implementation("com.google.zxing:core:3.5.3")
}