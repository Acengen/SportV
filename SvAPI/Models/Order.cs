using System;

namespace SvAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string ProductName {get;set;}
        public DateTime Date { get; set; }

        public Order()
        {
            Date = DateTime.Now;   
        }
    }
}