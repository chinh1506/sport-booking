import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const socket = new SockJS("http://localhost:8080/ws", null, {
    // headers:{
    // }
    //   Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHZFNHMTdZRmtyc1lfSmhNT3p1WVFDZVo4dWFva2JCcEZJRDZHcjJaci1FIn0.eyJleHAiOjE3NDIzNDg3OTEsImlhdCI6MTc0MjM0ODQ5MSwianRpIjoiNWQzMDk4NDAtYmZkOC00MWNmLWI5YjUtOGNmNzFmOTc5ZWJjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3JlYWxtcy9teXNwcmluZ2FwcCIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiJjYzczOTYxYi1lZDkwLTRhOGMtOWZmZS1lMjNlMWM0NmU1YjEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhY2NvdW50LXNlcnZpY2UiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1teXNwcmluZ2FwcCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXVzZXJzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjE3LjAuMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWFjY291bnQtc2VydmljZSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMTcuMC4xIiwiY2xpZW50X2lkIjoiYWNjb3VudC1zZXJ2aWNlIn0.NQHjw9i75ERafXOIHl9iaNPCD3d8XQl5B2biWs0bH_pyijIcbWXY4ySNxiu8Fm8xwSMLuF6IlPMA7WsDZzI-SBPncAXPLxnst87jHFZNCK686vDxAti5IMSWtHTyqfObQtWf1IGgrHAPS-UKSG8bh9Va_b0B8Frw5afzgU6BQhluiUJg5gOvsrAcGUqoDYlnE9XnM8vdun3MVFy6cQSlVUT4Dgae6III8XBzkFpJNK5C7rqwMHSGEq5YMIVRL8q3deSgEnodJuXwluK0KFMtPh4v_ukTjXXoazLkwc2KA5Eyoyzfu4tRe5Gblk3EWKOUqsyzWT6lKXJoQZP8N1g5Jg`
});
// export const stompClient = Stomp.over(()=>socket)
export const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => {
        console.log(str);
    },
    onConnect: (frame) => {
        console.log("Connected to WebSocket");
        console.log(frame);
        stompClient.subscribe("/topic/greetings", (response) => {
            console.log("Received message:", response.body);
        });
    },
    onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
    },
});
