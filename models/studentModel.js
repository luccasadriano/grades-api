//criando o modelo
export default (mongoose) => {
const schema = mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   subject: {
      type: String,
      require: true,
   },
   type: {
      type: String,
      require: true,
   },
   value: {
      type: Number,
      require: true,
      validate(value){
         if(value < 0)
         throw new Error("Valor negativo para a nota não permitido")
      },
      min: 0
   },
   lastModified: {
      type: Date,
      default: Date.now,
   }
})

const studentModel = mongoose.model('student', schema, 'student')

return studentModel
}
