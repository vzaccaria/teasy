$(BUILDIR)/%.xelatex.pdf: %.xelatex.tex $(BUILDIR)/.f
	xelatex $<
	xelatex $<
	mv $*.xelatex.pdf $(BUILDIR)
	rm -f $*.xelatex.aux $*.xelatex.log
