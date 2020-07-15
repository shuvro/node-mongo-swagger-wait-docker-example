FROM node:8.17
ARG PORT

RUN apt-get update
RUN apt-get install -y apt-transport-https ca-certificates

RUN mkdir -p /app
WORKDIR /app
ADD . /app

ADD ./docker-wait/wait /wait
RUN chmod +x /wait

RUN npm install
EXPOSE ${PORT}
CMD /wait && npm run dev
