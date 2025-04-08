# INSTALL
nvm install 18 --lts
nvm use node 18
npm install
npm start

# CLEAR CACHE
rm -rf node_modules
rm package-lock.json # or yarn.lock if you're using yarn
npm cache clean --force # or yarn cache clean if you're using yarn
