mv package-lock.json package-lock1.json
EAS_NO_VCS=1 eas build -p android --profile preview
mv package-lock1.json package-lock.json