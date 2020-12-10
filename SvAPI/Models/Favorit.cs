namespace SvAPI.Models
{
    public class Favorit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Brand { get; set; }
        public string Age { get; set; }
        public int UId {get;set;}
        public bool isFav {get;set;} 
        public int PId {get;set;}
    }
}