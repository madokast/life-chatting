# Capacitor 项目打包安卓 APK 详细文档

## 1. 环境准备

### 1.1 必要软件安装
- **Node.js**：版本 16 或更高（已安装）
  - 验证安装：`node -v`
- **JDK**：版本 11 或更高
  - 推荐使用 OpenJDK 11
  - 下载地址：https://adoptium.net/temurin/releases/
- **Android Studio**：用于安装 Android SDK 和工具链
  - 下载地址：https://developer.android.com/studio
- **Gradle**：版本 7.0 或更高
  - 通常由 Android Studio 自动管理
  - 也可独立安装：https://gradle.org/releases/

### 1.2 可选工具
- **Git**：版本控制工具（已安装）
  - 验证安装：`git --version`
- **SDK Manager**：用于管理 Android SDK 组件
  - 可通过 Android Studio 或命令行使用

## 2. 环境配置

### 2.1 JDK 安装和配置

#### 2.1.1 安装步骤
1. 下载适合你系统的 JDK 11 安装包
2. 双击安装，选择默认安装路径
3. 配置环境变量：
   
   **Windows**：
   - 右键 "此电脑" → "属性" → "高级系统设置" → "环境变量"
   - 新建系统变量 `JAVA_HOME`，值为 JDK 安装路径（如 `C:\Program Files\Eclipse Adoptium\jdk-11.0.23.9-hotspot`）
   - 在系统变量 `Path` 中添加 `%JAVA_HOME%\bin`
   
   **Linux**：
   - 解压 JDK 压缩包到 `/usr/lib/jvm/` 目录
   - 编辑 `/etc/profile` 或 `~/.bashrc` 文件，添加：
     ```bash
     export JAVA_HOME=/usr/lib/jvm/jdk-11.0.23
     export PATH=$JAVA_HOME/bin:$PATH
     ```
   - 执行 `source /etc/profile` 或 `source ~/.bashrc` 生效
   
   **macOS**：
   - 使用 Homebrew 安装：`brew install openjdk@11`
   - 或手动安装后配置环境变量

#### 2.1.2 验证安装
```bash
java -version
javac -version
```

### 2.2 Android Studio 安装

#### 2.2.1 安装步骤
1. 下载 Android Studio 安装包
2. 双击安装，选择安装路径
3. 启动 Android Studio，根据向导完成首次设置
4. 安装必要的 SDK 组件

#### 2.2.2 首次启动设置
- 选择 "Custom" 安装类型
- 选择 Android SDK 安装路径（建议使用默认路径）
- 选择需要的 Android SDK Platform 版本（建议选择最新稳定版和目标版本）
- 选择 Android SDK Build-Tools（建议选择最新版本）
- 选择其他必要组件：
  - Android SDK Platform-Tools
  - Android Emulator（可选，用于模拟器测试）
  - Intel x86 Emulator Accelerator (HAXM installer)（可选，加速模拟器）

### 2.3 Android SDK 配置

#### 2.3.1 配置环境变量

**Windows**：
- 新建系统变量 `ANDROID_HOME`，值为 Android SDK 安装路径（如 `C:\Users\用户名\AppData\Local\Android\Sdk`）
- 在系统变量 `Path` 中添加：
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\tools`
  - `%ANDROID_HOME%\tools\bin`

**Linux**：
- 编辑 `/etc/profile` 或 `~/.bashrc` 文件，添加：
  ```bash
  export ANDROID_HOME=~/Android/Sdk
  export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$PATH
  ```
- 执行 `source /etc/profile` 或 `source ~/.bashrc` 生效

**macOS**：
- 编辑 `~/.zshrc` 或 `~/.bash_profile` 文件，添加：
  ```bash
  export ANDROID_HOME=~/Library/Android/sdk
  export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$PATH
  ```
- 执行 `source ~/.zshrc` 或 `source ~/.bash_profile` 生效

#### 2.3.2 验证安装
```bash
adb --version
```

### 2.4 Gradle 配置

#### 2.4.1 配置 Gradle 镜像源
为了解决下载慢问题，建议配置 Gradle 镜像源：

1. 找到 `gradle.properties` 文件：
   - Windows：`C:\Users\用户名\.gradle\gradle.properties`
   - Linux/macOS：`~/.gradle/gradle.properties`

2. 添加以下内容（使用阿里云镜像）：
   ```properties
   # 阿里云 Maven 镜像
   systemProp.https.proxyHost=mirrors.aliyun.com
   systemProp.https.proxyPort=443
   systemProp.https.proxyUsername=
   systemProp.https.proxyPassword=
   
   # 阿里云 Gradle 镜像
   distributionUrl=https://mirrors.aliyun.com/gradle/distributions/gradle-7.6.1-bin.zip
   
   # 阿里云仓库
   maven { url 'https://maven.aliyun.com/repository/public' }
   maven { url 'https://maven.aliyun.com/repository/google' }
   maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
   ```

## 3. 项目配置

### 3.1 构建 Web 项目

1. 进入 Capacitor 项目目录：
   ```bash
   cd capacitor-react
   ```

2. 构建 Web 项目：
   ```bash
   npm run build
   ```

3. 确保构建输出目录与 Capacitor 配置一致：
   - 检查 `capacitor.config.ts` 中的 `webDir` 配置
   - 默认应为 `dist`，与 Vite 构建输出目录一致

### 3.2 同步 Capacitor 项目

1. 同步 Web 资源到移动平台：
   ```bash
   npx cap sync
   ```

2. 验证 Android 平台是否已添加：
   ```bash
   npx cap list
   ```
   - 如果未添加，执行：`npx cap add android`

### 3.3 生成签名密钥

#### 3.3.1 使用 keytool 生成密钥

1. 执行以下命令生成签名密钥：
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. 按照提示输入信息：
   - 密钥库密码
   - 姓名
   - 组织单位
   - 组织
   - 城市
   - 州/省
   - 国家代码
   - 确认信息
   - 密钥密码（可与密钥库密码相同）

3. 将生成的 `my-release-key.keystore` 文件复制到 `android/app/` 目录

#### 3.3.2 配置签名信息

1. 编辑 `android/app/build.gradle` 文件，添加签名配置：
   ```gradle
   android {
       // ...
       signingConfigs {
           release {
               storeFile file("my-release-key.keystore")
               storePassword "你的密钥库密码"
               keyAlias "my-key-alias"
               keyPassword "你的密钥密码"
           }
       }
       
       buildTypes {
           release {
               // ...
               signingConfig signingConfigs.release
           }
       }
   }
   ```

2. 注意：实际开发中建议使用环境变量或配置文件管理密码，避免硬编码

### 3.4 配置构建类型

编辑 `android/app/build.gradle` 文件，配置构建类型：

```gradle
android {
    // ...
    buildTypes {
        debug {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
}
```

## 4. 打包流程

### 4.1 调试版本打包

#### 4.1.1 使用 Capacitor CLI 运行

1. 确保设备已连接或模拟器已启动
2. 执行以下命令：
   ```bash
   npx cap run android
   ```

#### 4.1.2 使用 Android Studio 运行

1. 打开 Android 项目：
   ```bash
   npx cap open android
   ```

2. 在 Android Studio 中：
   - 选择设备或模拟器
   - 点击 "Run" 按钮（绿色三角形）
   - 等待构建和安装完成

### 4.2 发布版本打包

#### 4.2.1 使用 Capacitor CLI 构建

1. 构建发布版本：
   ```bash
   npx cap build android --release
   ```

2. 或使用 Gradle 命令：
   ```bash
   cd android && ./gradlew assembleRelease
   ```

#### 4.2.2 使用 Android Studio 构建

1. 打开 Android 项目：
   ```bash
   npx cap open android
   ```

2. 在 Android Studio 中：
   - 点击 "Build" → "Generate Signed Bundle / APK"
   - 选择 "APK" → "Next"
   - 选择签名密钥文件，输入密码
   - 选择 "release" 构建类型
   - 选择输出目录
   - 点击 "Finish"

### 4.3 生成 APK 文件

构建完成后，APK 文件将生成在以下位置：

- **调试版本**：`android/app/build/outputs/apk/debug/app-debug.apk`
- **发布版本**：`android/app/build/outputs/apk/release/app-release.apk`

## 5. 可能遇到的问题和解决方案

### 5.1 环境变量配置错误

**问题**：执行 `adb --version` 或 `java -version` 时提示命令未找到

**解决方案**：
- 检查 `JAVA_HOME`、`ANDROID_HOME` 和 `PATH` 环境变量是否正确配置
- 确保环境变量路径与实际安装路径一致
- 重启终端或系统，确保环境变量生效

### 5.2 SDK 版本不匹配

**问题**：构建时提示 "SDK version not found" 或 "Build-tools version not found"

**解决方案**：
- 使用 Android Studio 的 SDK Manager 安装所需版本
- 或使用命令行安装：
  ```bash
  sdkmanager "platforms;android-33" "build-tools;33.0.2"
  ```
- 更新 `android/app/build.gradle` 中的 `compileSdk` 和 `targetSdk` 版本

### 5.3 依赖下载慢

**问题**：Gradle 构建时依赖下载非常慢

**解决方案**：
- 配置 Gradle 镜像源（见 2.4.1 节）
- 确保网络连接正常
- 尝试使用 VPN（如果在国内）
- 手动下载依赖包到本地仓库

### 5.4 签名配置错误

**问题**：构建发布版本时提示签名错误

**解决方案**：
- 检查签名密钥文件路径是否正确
- 检查密码是否正确
- 确保密钥别名正确
- 检查 `build.gradle` 中的签名配置是否正确

### 5.5 内存不足

**问题**：构建时提示 "OutOfMemoryError"

**解决方案**：
- 增加 Gradle 堆内存：
  - 在 `gradle.properties` 中添加：
    ```properties
    org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
    ```
- 关闭其他占用内存的程序

### 5.6 权限问题

**问题**：安装 APK 时提示权限不足

**解决方案**：
- 在设备上启用 "未知来源应用安装"
- 使用 `adb install -r app-debug.apk` 命令安装
- 检查应用清单文件中的权限配置

## 6. 手动下载建议

### 6.1 Android Studio 手动下载

**国内用户下载慢解决方案**：
- 使用国内镜像网站下载：
  - 阿里云：https://developer.android.google.cn/studio
  - 腾讯云镜像：https://mirrors.cloud.tencent.com/android-studio/
  - 华为云镜像：https://mirrors.huaweicloud.com/android-studio/

### 6.2 SDK 组件手动安装

**手动下载 SDK 包**：
1. 访问 https://developer.android.com/studio/#command-tools
2. 下载 "Command line tools only"
3. 解压到 Android SDK 目录下的 `cmdline-tools/latest/` 目录
4. 使用命令行安装组件：
   ```bash
   sdkmanager --sdk_root=~/Android/Sdk "platforms;android-33" "build-tools;33.0.2" "platform-tools"
   ```

### 6.3 Gradle 依赖手动下载

**手动下载 Gradle 分发版**：
1. 访问 https://gradle.org/releases/
2. 下载所需版本的 Gradle 压缩包
3. 解压到 `~/.gradle/wrapper/dists/gradle-版本号-bin/随机字符串/` 目录

## 7. 后续优化

### 7.1 减小 APK 体积

1. **启用 ProGuard 混淆**：
   ```gradle
   android {
       buildTypes {
           release {
               minifyEnabled true
               shrinkResources true
               proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
           }
       }
   }
   ```

2. **使用 Android App Bundle (AAB) 格式**：
   ```bash
   npx cap build android --release --bundle
   ```
   - AAB 格式会根据设备配置生成优化的 APK
   - 适合发布到 Google Play Store

3. **移除不必要的依赖**：
   - 检查 `package.json` 中的依赖
   - 移除未使用的依赖包

### 7.2 自动化构建

1. **配置 CI/CD 流水线**：
   - 使用 GitHub Actions
   - 使用 GitLab CI/CD
   - 使用 Jenkins

2. **示例 GitHub Actions 配置**：
   ```yaml
   name: Build Android APK
   
   on: [push, pull_request]
   
   jobs:
     build:
       runs-on: ubuntu-latest
       
       steps:
         - uses: actions/checkout@v3
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
         - name: Install dependencies
           run: npm ci
         - name: Build web project
           run: npm run build
         - name: Setup Java
           uses: actions/setup-java@v3
           with:
             distribution: 'adopt'
             java-version: '11'
         - name: Setup Android SDK
           uses: android-actions/setup-android@v2
         - name: Build Android APK
           run: |
             npx cap sync
             cd android && ./gradlew assembleRelease
         - name: Upload APK
           uses: actions/upload-artifact@v3
           with:
             name: app-release.apk
             path: android/app/build/outputs/apk/release/app-release.apk
   ```

### 7.3 多渠道打包

1. **配置产品 flavors**：
   ```gradle
   android {
       // ...
       flavorDimensions "default"
       productFlavors {
           google {
               dimension "default"
               applicationIdSuffix ".google"
               versionNameSuffix "-google"
           }
           huawei {
               dimension "default"
               applicationIdSuffix ".huawei"
               versionNameSuffix "-huawei"
           }
       }
   }
   ```

2. **构建特定渠道 APK**：
   ```bash
   cd android && ./gradlew assembleGoogleRelease
   ```

## 8. 命令汇总

### 8.1 环境验证命令
```bash
node -v                 # 检查 Node.js 版本
npm -v                  # 检查 npm 版本
java -version           # 检查 JDK 版本
javac -version          # 检查 Java 编译器版本
adb --version           # 检查 ADB 版本
git --version           # 检查 Git 版本
npx cap --version       # 检查 Capacitor CLI 版本
```

### 8.2 项目构建命令
```bash
npm run build           # 构建 Web 项目
npx cap sync            # 同步 Capacitor 项目
npx cap add android     # 添加 Android 平台
npx cap list            # 列出已添加的平台
```

### 8.3 调试运行命令
```bash
npm run dev             # 启动 Web 开发服务器
npx cap run android     # 运行调试版本到设备
npx cap open android    # 使用 Android Studio 打开项目
```

### 8.4 发布构建命令
```bash
npx cap build android --release       # 构建发布版本
cd android && ./gradlew assembleRelease  # 使用 Gradle 构建发布版本
cd android && ./gradlew assembleDebug    # 使用 Gradle 构建调试版本
```

### 8.5 签名相关命令
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000  # 生成签名密钥
keytool -list -v -keystore my-release-key.keystore  # 查看签名密钥信息
```

## 9. 文档维护

- **文档版本**：v1.0
- **创建日期**：2026-01-12
- **作者**：Life Chatting 开发团队
- **更新记录**：
  - 2026-01-12：初始创建

## 10. 参考资源

- [Capacitor 官方文档](https://capacitorjs.com/docs/getting-started)
- [Android 官方文档](https://developer.android.com/guide)
- [Gradle 官方文档](https://docs.gradle.org/)
- [OpenJDK 下载](https://adoptium.net/temurin/releases/)
- [Android Studio 下载](https://developer.android.com/studio)

---

## 注意事项

1. **安全性**：
   - 不要将签名密钥文件提交到版本控制系统
   - 不要在代码中硬编码密码，建议使用环境变量或配置文件
   - 定期更换签名密钥

2. **兼容性**：
   - 确保目标 SDK 版本与设备兼容
   - 测试不同 Android 版本和设备
   - 遵循 Android 设计规范

3. **性能**：
   - 优化 Web 项目性能，减小资源大小
   - 启用代码分割和懒加载
   - 优化图片和资源

4. **测试**：
   - 在真实设备上测试
   - 测试不同网络条件
   - 测试应用权限和功能

通过以上步骤，你应该能够成功将 Capacitor 项目打包为安卓 APK 文件。如果遇到问题，请参考第 5 节的解决方案，或查阅相关官方文档。