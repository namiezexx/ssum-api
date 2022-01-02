# 어떤 이미지로부터 새로운 이미지를 생성할지 지정
FROM node:12-alpine

# /app 디렉토리 생성
RUN mkdir -p /app

# /app 디렉토리를 WORKDIR로 설정
WORKDIR /app

# 현재 Dockerfile이 있는 경로의 모든 파일을 /app에 복사
ADD . /app

# npm install을 실행
RUN npm install

# 환경변수 NODE_ENV의 값을 development로 설정
ENV NODE_ENV development

# 가상 머신에 오픈할 포트
EXPOSE 3000

# 컨테이너에서 실행될 명령을 지정
CMD [ "npm", "test" ]
