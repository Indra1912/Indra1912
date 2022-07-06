﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace letsvote.Models
{
    public class UserModel
    {
        public int voter_id { get; set; }
        public string name { get; set; }
        public string mobile { get; set; }
        public Nullable<System.DateTime> birthdate { get; set; }
        public string address { get; set; }
        public string password { get; set; }
    }
}