package utils

import "time"

func FormatDate(date time.Time) string {
	return date.Format("2006-01-02")
}

