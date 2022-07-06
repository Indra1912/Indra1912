using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace letsvote.Models
{
    public class CandidateModel
    {
        public int Party_id { get; set; }
        public string partyname { get; set; }
        public string candidatename { get; set; }
        
        public Nullable<int> votecount { get; set; }

    }
}