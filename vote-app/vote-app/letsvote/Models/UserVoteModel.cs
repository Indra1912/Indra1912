using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace letsvote.Models
{
    public class UserVoteModel
    {
        public int Voter_id { get; set; }
        public int Party_id { get; set; }
        public int vote_id { get; set; }
        
    }
}