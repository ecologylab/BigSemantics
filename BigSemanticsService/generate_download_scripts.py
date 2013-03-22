#Creates a script to checkout all repos

repo_prefix = 'https://github.com/ecologylab/'
repo_prefix_ssh = 'git@github.com:ecologylab/'

repo_lines = file("repo_comma_location.txt").readlines()

text = ""
text_ssh = ""

for line in repo_lines:
    repo,location = line.strip().split()
    text += "git clone "+repo_prefix+repo+".git "+location+"\n"
    text_ssh += "git clone "+repo_prefix_ssh+repo+".git "+location+"\n"

bat = file("checkout.bat","w").write(text)
sh = file("checkout.sh","w").write(text)
bat_ssh = file("checkout_ssh.bat","w").write(text_ssh)
sh_ssh = file("checkout_ssh.sh","w").write(text_ssh)