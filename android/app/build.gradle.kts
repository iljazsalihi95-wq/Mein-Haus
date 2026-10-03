plugins { id("com.android.application") }
android {
    namespace = "com.meinhaus.app"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.meinhaus.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 3
        versionName = "1.1.0-native"
    }
    buildTypes {
        release { isMinifyEnabled = false }
    }
}