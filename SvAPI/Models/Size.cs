namespace SvAPI.Models
{
    public class Size
    {
        public int Id { get; set; }
        public string Sizes { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}