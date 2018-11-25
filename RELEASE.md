jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /home/osboxes/devel/faucon-millenium/my-release-key.keystore /home/osboxes/devel/faucon-millenium/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk brahms
zipalign -v 4 /home/osboxes/devel/faucon-millenium/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk faucon.apk
