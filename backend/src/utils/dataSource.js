//Condição para verificar se o MongoDB está habilitado como fonte de dados. 
// Se a variável de ambiente DATA_SOURCE estiver definida como "mongodb", a função retornará true, caso contrário, retornará false.
export function isMongoEnabled() {
  return (process.env.DATA_SOURCE || "json").toLowerCase() === "mongodb";
}