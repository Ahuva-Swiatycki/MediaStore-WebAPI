﻿using System;
using System.Collections.Generic;

namespace App.DA.Entities;

public partial class Cart
{
    public Guid CartId { get; set; }

    public Guid UserId { get; set; }

    public Guid ProductId { get; set; }

    public int Quantity { get; set; }

    public Guid? SessionId { get; set; }

    public decimal Price { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}