using System;
using System.Collections.Generic;
using API.Models;
using Daystride.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Daystride.Data;

public partial class DayStrideContext : IdentityDbContext<User>
{
    public DayStrideContext()
    {
    }

    public DayStrideContext(DbContextOptions<DayStrideContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Activity> Activities { get; set; }

    public virtual DbSet<ActivityCategory> ActivityCategories { get; set; }

    public virtual DbSet<ActivityType> ActivityTypes { get; set; }

    public virtual DbSet<Color> Colors { get; set; }

    public virtual DbSet<Date> Dates { get; set; }

    public virtual DbSet<GoalPeriodType> GoalPeriodTypes { get; set; }

    public virtual DbSet<Mood> Moods { get; set; }
    public virtual DbSet<MoodEvent> MoodEvents { get; set; }

    public virtual DbSet<TimeRange> TimeRanges { get; set; }

    public virtual DbSet<Unit> Units { get; set; }

    public virtual DbSet<UserDate> UserDates { get; set; }

    public virtual DbSet<UsersActivity> UsersActivities { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=192.168.0.50,1433;Database=DayStride;User Id=sa;Password=Cacchetta3241;Encrypt=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<IdentityRole>(entity =>
        {
            entity.HasData(
                new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
            );
        });

        modelBuilder.Entity<Activity>(entity =>
        {
            entity.Property(e => e.ActivityName).HasMaxLength(50);

            entity.HasOne(d => d.Category).WithMany(p => p.Activities)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_Activities_ActivityCategories");

            entity.HasOne(d => d.Color).WithMany(p => p.Activities)
                .HasForeignKey(d => d.ColorId)
                .HasConstraintName("FK_Activities_Colors");

            entity.HasOne(d => d.GoalPeriodType).WithMany(p => p.Activities)
                .HasForeignKey(d => d.GoalPeriodTypeId)
                .HasConstraintName("FK_Activities_GoalPeriodTypes");

            entity.HasOne(d => d.TimeRanges).WithMany(p => p.Activities)
                .HasForeignKey(d => d.TimeRangesId)
                .HasConstraintName("FK_Activities_TimeRanges");

            entity.HasOne(d => d.Type).WithMany(p => p.Activities)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK_Activities_ActivityTypes");

            entity.HasOne(d => d.Unit).WithMany(p => p.Activities)
                .HasForeignKey(d => d.UnitId)
                .HasConstraintName("FK_Activities_Units");
        });

        modelBuilder.Entity<ActivityCategory>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.ActivityCategoryName).HasMaxLength(20);
        });

        modelBuilder.Entity<ActivityType>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.ActivityTypeName).HasMaxLength(20);
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.ColorCode).HasMaxLength(10);
        });

        modelBuilder.Entity<Date>(entity =>
        {
            entity.Property(e => e.Date1).HasColumnName("Date");
        });

        modelBuilder.Entity<GoalPeriodType>(entity =>
        {
            entity.Property(e => e.GoalPeriodName).HasMaxLength(10);
        });

        modelBuilder.Entity<Mood>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.MoodName).HasMaxLength(20);
        });
        modelBuilder.Entity<MoodEvent>(entity =>
        {
            entity.HasOne(m => m.Mood).WithMany(e => e.MoodEvents)
                .HasForeignKey(m => m.MoodId)
                .HasConstraintName("FK_MoodEvents_Moods");
        });

        modelBuilder.Entity<TimeRange>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.TimeRange1)
                .HasMaxLength(20)
                .HasColumnName("TimeRange");
        });

        modelBuilder.Entity<Unit>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.UnitName).HasMaxLength(50);
        });

        modelBuilder.Entity<UserDate>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.Activity).WithMany(p => p.UserDates)
                .HasForeignKey(d => d.ActivityId)
                .HasConstraintName("FK_UserDates_Activities");

            entity.HasOne(d => d.Date).WithMany(p => p.UserDates)
                .HasForeignKey(d => d.DateId)
                .HasConstraintName("FK_UserDates_Dates");

            entity.HasOne(d => d.Mood).WithMany(p => p.UserDates)
                .HasForeignKey(d => d.MoodId)
                .HasConstraintName("FK_UserDates_Moods");
        });

        modelBuilder.Entity<UsersActivity>(entity =>
        {
            entity.Property(e => e.ActivityName).HasMaxLength(50);
            entity.Property(e => e.ReminderMessage).HasMaxLength(255);

            entity.HasOne(d => d.Category).WithMany(p => p.UsersActivities)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_UsersActivities_ActivityCategories");

            entity.HasOne(d => d.Color).WithMany(p => p.UsersActivities)
                .HasForeignKey(d => d.ColorId)
                .HasConstraintName("FK_UsersActivities_Colors");

            entity.HasOne(d => d.GoalPeriodType).WithMany(p => p.UsersActivities)
                .HasForeignKey(d => d.GoalPeriodTypeId)
                .HasConstraintName("FK_UsersActivities_GoalPeriodTypes");

            entity.HasOne(d => d.TimeRange).WithMany(p => p.UsersActivities)
                .HasForeignKey(d => d.TimeRangeId)
                .HasConstraintName("FK_UsersActivities_TimeRanges");

            entity.HasOne(d => d.Type).WithMany(p => p.UsersActivities)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK_UsersActivities_ActivityTypes");

            entity.HasOne(d => d.Unit).WithMany(p => p.UsersActivities)
                .HasForeignKey(d => d.UnitId)
                .HasConstraintName("FK_UsersActivities_Units");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
