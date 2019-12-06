# Bedrock Manager
## setup
```
git clone https://github.com/Fnit-Crafters/bedrock-manager.git
cd bedrock-manager
npm i
```

## Discord Bot & managerの起動
```
cp .env.example .env
vim .env
npm start
```

## Game Serverの起動
```
# on your bedrock dedicated server
cp ./bedrock-manager/start.sh .
chmod +x start.sh
./start.sh
```