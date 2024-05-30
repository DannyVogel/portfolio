export default defineEventHandler(async (event) => {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  throw createError({ statusCode: 400, statusText: "This is an error" });
  // return res;
});
